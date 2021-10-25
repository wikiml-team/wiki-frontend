import { toNumber } from "lodash";

export type BudgetItem = {
    id: string
    name: string
    values?: { price: number, amount: number } 
    subtotal?: boolean
    columns?: string[]
}

export type SubtotalItem = {
    type: 'subtotal'
    id: string 
    titleId: string
    level: number
    name: string
    values: { price: number, amount: number } 
}

export default class BudgetList {

    items: BudgetItem[]; 
    columns: string[];
    levelLimit: number;

    constructor(items: BudgetItem[], columns: string[] = [], levelLimit: number = 3) {
        this.items = items
        this.columns = columns;
        this.levelLimit = levelLimit;
    }

    findItem(id: string) : BudgetItem {
        return this.items.find(item => item.id === id) || {} as BudgetItem
    }
    
    toBudgetItemInfo(item: BudgetItem) : BudgetItemInfo {
        const level = this.getItemLevel(item.id)
        const siblings =  this.findSiblings(item.id)

        return {
            ...item,
            level: level,
            hasSiblings: siblings.length > 1,
            type: level === this.levelLimit -1? 'item' : level === 0? 'title' : 'subtitle'
        } as LevelBudgetItem
    }
    
    findFatherId(id: string) : string {
        let aux = id.split('.')
        aux.pop()
        return aux.join('.')
    }
    
    generateId(parentId: string, num: number): string {
        return parentId + '.' + num;
    }
    
    // Level = Depth
    getItemLevel(id: string) : number {
        return id.split('.').length -1 
    }

    // Order = siblings befor it
    getItemOrder(id: string) : number {
        return toNumber(id.split('.').pop()) || 0
    }
    
    findChildren(id: string) : BudgetItem[] {
        return this.items.filter(item => item.id.includes(id + '.'))
    }

    findChildrenItems(id: string) : BudgetItem[] {
        return this.items.filter(item => item.id.includes(id + '.') && this.getItemLevel(item.id) === this.levelLimit -1)
    }

    findInmediateChildrenItems(id: string) {
        return this.items.filter(item => item.id.includes(id + '.') && 
                                this.getItemLevel(item.id) - this.getItemLevel(id) === 1)
    }
    findSiblings(id: string) {
        return this.findInmediateChildrenItems(this.findFatherId(id))
    }

    buildBudgetItemsList(showSubtotals: boolean = false) : BudgetItemInfo[] {
        
        let infoItems : BudgetItemInfo[] = this.items.map(item => {
            return this.toBudgetItemInfo(item)
        }).sort((a, b) => this.compareIds(a, b))

        if (showSubtotals) {

            // add subtotal rows
            infoItems.forEach((item, i) => {
                if(item.type === 'title' || item.type === 'subtitle') {
                    const childrenItems = this.findChildrenItems(item.id)

                    if(childrenItems.length > 1) {
                        const children = this.findChildren(item.id)
                        const n_children = children.length
                        
                        if (n_children) {
                            const subtotalPrice = children.map(item => {
                                const price = item.values?.price || 0
                                const amount = item.values?.amount || 0
                                return price * amount
                            }).reduce((prev, next) => prev + next);
                            const subtotalAmount = children.map(item => item.values?.amount || 0).reduce((prev, next) => prev + next);
                            
                            const subtotalItem = {
                                type: 'subtotal',
                                id: '' ,
                                titleId: item.id,
                                level: this.getItemLevel(item.id),
                                name: item.name,
                                values: { price: Math.floor(subtotalPrice *100)/100, amount: Math.floor(subtotalAmount *100)/100 }
                            } as SubtotalItem
                            
                            // insert subtotal passing its children
                            infoItems.splice(i + n_children + 1, 0, subtotalItem)
                        }
                    }
                }
            })
        }

        return infoItems
    }

    
    compareIds(item1: BudgetItem, item2: BudgetItem) : number {

        // if same level then compare the order inside level
        const item1split = item1.id.split('.')
        const item2split = item2.id.split('.')

        const minLen = Math.min(item1split.length, item2split.length)

        for (let index = 0; index < minLen; index++) {
            const diff = toNumber(item1split[index]) - toNumber(item2split[index])
            
            if (diff !== 0) return diff;
            
            if (index === item1split.length -1 && index === item2split.length -1) return 0 
        }
        // if reached len and still equal but one still have more slots in id...
        return item1split.length - item2split.length 
        
    }

    addItem(siblingId: string) {
        // Update siblingsIds below
        const siblings = this.findSiblings(siblingId)
        const newItemOrder = this.getItemOrder(siblingId) + 1
        siblings.filter(sibling => this.getItemOrder(sibling.id) >= newItemOrder).sort((a, b) => 
            this.compareIds(a, b)
        ).forEach((sibling, key) => {
            sibling.id = this.updateId(sibling.id, (newItemOrder + key + 1).toString(), this.getItemLevel(sibling.id)) 
        })

        // Create new item
        const newItem = {
            id: this.updateId(siblingId, newItemOrder.toString(), this.getItemLevel(siblingId)),
            name: 'New Item',
            columns: Array(this.columns.length),
            values: {
                price: 0,
                amount: 0
            }
        } as BudgetItem

        // Add to list
        this.items.push(newItem);
        this.items = this.items.sort((a, b) => this.compareIds(a, b));

        return newItem
    }

    // true if deleted one element, false otherwise
    deleteItem(id: string): boolean {
        // Count length
        const len = this.items.length

        const type = this.toBudgetItemInfo(this.findItem(id)).type;

        switch (type) {
            case 'item':
                // Delete from items
                this.items = this.items.filter(item => item.id !== id)
                
                // Update siblings ids
                const siblings = this.findSiblings(id)
                siblings.forEach((child, key) => {
                    child.id = this.updateId(child.id, (key + 1).toString(), this.getItemLevel(id))
                });
                
                break;

            case 'title' || 'subtitle': 
                break;
        
            case 'subtotal':
                break;
            default:
                break;
        }

        return len === this.items.length +1
    }

    updateId(id: string, value: string, slot: number): string {
        let newId = id.split('.')
        newId[slot] = value
        return newId.join('.')
    }

}

export type LevelBudgetItem = BudgetItem & { level: number, hasSiblings?: boolean, type: 'item' | 'title' | 'subtitle' }

export type BudgetItemInfo = LevelBudgetItem | SubtotalItem