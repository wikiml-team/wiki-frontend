import { toNumber } from "lodash";

export type BudgetItem = {
    id: string
    name: string
    values?: { price: number, amount: number } 
    subtotal?: number
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
        return this.items.find(item => item.id == id) || {} as BudgetItem
    }

    findFatherId(id: string) : string {
        return id.split('.').pop()?.toString() || ''
    }

    generateId(parentId: string, num: number): string {
        return parentId + '.' + num;
    }

    getItemLevel(id: string) : number {
        return id.split('.').length -1 
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

    buildBudgetItemsList(showSubtotals: boolean = false) : BudgetItemInfo[] {
        
        let infoItems : BudgetItemInfo[] = this.items.map(item => {
            const level = this.getItemLevel(item.id)
            const siblings =  this.findInmediateChildrenItems(this.findFatherId(item.id))
            return {
                ...item,
                level: level,
                hasSiblings: siblings.length > 1,
                type: level === this.levelLimit -1? 'item' : level === 0? 'title' : 'subtitle'
            } as LevelBudgetItem

        }).sort((a: BudgetItemInfo, b: BudgetItemInfo) => this.compareIds(a, b))

        if (showSubtotals) {

            // add subtotal rows
            infoItems.forEach((item, i) => {
                if(item.type === 'title' || item.type === 'subtitle') {
                    const childrenItems = this.findChildrenItems(item.id)

                    if(childrenItems.length > 1) {
                        const children = this.findChildren(item.id)
                        const n_children = children.length
                        
                        if (n_children) {
                            const subtotalPrice = children.map(item => item.values?.price || 0).reduce((prev, next) => prev + next);
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

    
    compareIds(item1: BudgetItemInfo, item2: BudgetItemInfo) : number {

        // if same level then compare the order inside level
        const item1split = item1.id.split('.')
        const item2split = item2.id.split('.')

        for (let index = 0; ; index++) {
            const diff = toNumber(item1split[index]) - toNumber(item2split[index])
            
            if (diff !== 0) return diff;
            
            if (index === item1split.length && index === item2split.length) return 0 
            if (index === item1split.length) return -1
            if (index === item2split.length) return 1

            // if they are equal and length isn't reached keep checking
        }
    }

}

export type LevelBudgetItem = BudgetItem & { level: number, hasSiblings?: boolean, type: 'item' | 'title' | 'subtitle' }

export type BudgetItemInfo = LevelBudgetItem | SubtotalItem