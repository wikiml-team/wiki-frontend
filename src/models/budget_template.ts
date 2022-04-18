
export interface BudgetTemplateItem {
    __typename?: "budgetTemplates",
    id?: number, 
    item?: string,
    itemDescription?: string,
    itemName?: string,
    measureUnitId: number, 
    methodologyId: number, 
    subtotal?: boolean,
    permanent?: boolean,
    createdAt?: Date, 
    updatedAt?: Date, 
}


export default class BudgetTemplateClass {
    listBudgetTemplate: BudgetTemplateItem[];
    BudgetTemplate: BudgetTemplateItem;
    orderedList: BudgetTemplateItem[]; 

    constructor() {
        this.listBudgetTemplate = [];
        this.orderedList = [];
        this.BudgetTemplate = {
            __typename: "budgetTemplates",
            id: 0,
            item: '',
            itemDescription: '',
            itemName: '',
            measureUnitId: 0,
            methodologyId: 0,
            subtotal: false,
            permanent: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }

    public addNewItem(listBudgetTemplate: BudgetTemplateItem[], itemParent?: BudgetTemplateItem): BudgetTemplateItem {
        this.listBudgetTemplate = listBudgetTemplate

        let itemNew: BudgetTemplateItem = {
            "item": this.getNewItemID(itemParent),
            "itemDescription": "item new description",
            "itemName": "item new name" ,
            "measureUnitId": 1,
            "methodologyId": itemParent?.methodologyId || 1,
            "subtotal": false,
            "permanent": true
          }

        return itemNew
    }

    public getLastItem(listBudgetTemplate: BudgetTemplateItem[]): BudgetTemplateItem {
        let lastItem = listBudgetTemplate[0]
        
        listBudgetTemplate.map((currentItem) => {
            if (currentItem.id && lastItem.id){
                if (currentItem.id > lastItem.id){
                    lastItem = currentItem
                }
            }
        })

        return lastItem
    }

    public getLevel(item?: BudgetTemplateItem): number {
        if (item && item.item?.split('.').length){
            return item.item?.split('.').length
        }
        return 0
    }

    public getNewItemID(itemParent?: BudgetTemplateItem) :string {
        const level = this.getLevel(itemParent)
        let newID = ''

        if (!itemParent) {
            let lastID = '0'
            let currentID = '0'

            this.listBudgetTemplate.map((currentItem) => {
                if (currentItem.item) {
                    currentID = currentItem.item?.split('.')[0]

                    if (Number(currentID) > Number(lastID)) {
                        lastID = currentID
                    }
                }
            })

            newID = String(Number(lastID) + 1)
        }

        if (itemParent && level === 1) {
            if (itemParent.item) {
                let lastID: string[] = [itemParent.item.split('.')[0], '0']
                let currentID: string[] = [itemParent.item.split('.')[0], '0']

                this.listBudgetTemplate.map((currentItem) => {
                    if (currentItem.item) {
                        currentID = currentItem.item?.split('.')

                        if (Number(currentID[1]) > Number(lastID[1])) {
                            lastID = currentID
                        }
                    }
                })

                newID = itemParent.item.split('.')[0] + '.' + String(Number(lastID[1]) + 1)
            }
        }

        if (itemParent && level === 2) {
            if (itemParent.item) {
                let lastID: string[] = [itemParent.item.split('.')[0], itemParent.item.split('.')[1], '0']
                let currentID: string[] = [itemParent.item.split('.')[0], itemParent.item.split('.')[1], '0']

                this.listBudgetTemplate.map((currentItem) => {
                    if (currentItem.item) {
                        currentID = currentItem.item?.split('.')

                        if (itemParent.item && 
                            currentID[0] === itemParent.item.split('.')[0] &&  
                            currentID[1] === itemParent.item.split('.')[1] &&       
                            Number(currentID[2]) > Number(lastID[2])) {
                            lastID = currentID
                        }
                    }
                })

                newID = itemParent.item.split('.')[0] + '.' + itemParent.item.split('.')[1] + '.' + String(Number(lastID[2]) + 1)
            }
        }

        if (itemParent && level === 3) {
            if (itemParent.item) {
                let lastID: string[] = [itemParent.item.split('.')[0], itemParent.item.split('.')[1], itemParent.item.split('.')[2], '0']
                let currentID: string[] = [itemParent.item.split('.')[0], itemParent.item.split('.')[1], itemParent.item.split('.')[2], '0']

                this.listBudgetTemplate.map((currentItem) => {
                    if (currentItem.item) {
                        currentID = currentItem.item?.split('.')

                        if (itemParent.item && 
                            currentID[0] === itemParent.item.split('.')[0] &&  
                            currentID[1] === itemParent.item.split('.')[1] &&   
                            currentID[2] === itemParent.item.split('.')[2] &&       
                            Number(currentID[3]) > Number(lastID[3])) {
                            lastID = currentID
                        }
                    }
                })

                newID = itemParent.item.split('.')[0] + '.' + itemParent.item.split('.')[1] + '.' + itemParent.item.split('.')[2] + '.' + String(Number(lastID[3]) + 1)
            }
        }

        return newID
    }

    public getOrderedList() : void { 
        this.listBudgetTemplate.map((currentItem) => {
            let splitSize = Number(currentItem.item?.split('.').length)
            if (splitSize === 1){
                this.orderedList.push(currentItem)
                this.getOrderedChildList(currentItem)
            }
        })
    }

    public getOrderedChildList(parentItem: BudgetTemplateItem) :void { 
        //ParentSplit
        let splitSizeParent = Number(parentItem.item?.split('.').length)

        this.listBudgetTemplate.map((currentItem) => { 
            //ChildSplit
            let splitSizeChild = Number(currentItem.item?.split('.').length)
            if(splitSizeChild === splitSizeParent + 1){
                for (let i = 0; i < splitSizeParent; i++){
                    if (parentItem.item?.split('.')[i] === currentItem.item?.split('.')[i]) {
                        this.orderedList.push(currentItem)
                        this.getOrderedChildList(currentItem)
                    }
                }
            }
        })
    }

    public checkHasChild(item: BudgetTemplateItem, itemList: BudgetTemplateItem[]): Number {
        let splitSize = Number(item.item?.split('.').length)
        let numberOfChild = 0

        itemList.map((currentItem) => {
            let isChild = false
            if (Number(currentItem.item?.split('.').length) === splitSize + 1) {
                for (let i = 0; i < splitSize; i++) {
                    if (item.item?.split('.')[i] === currentItem.item?.split('.')[i]) {
                        isChild = true
                    }
                    else{
                        isChild = false
                    }
                }
            }
            if (isChild){
                numberOfChild ++
            }
        })
        return numberOfChild
    }
}