import { IGroup } from '@fluentui/react';
import INodeInfo from 'models/nodeinfo';

export enum CategoryName { "beneficiary", "intermediary", "implementer", "donor", "other" }

export interface Category {
    name: CategoryName,
    minMain?: number,
    hasNoMain?: boolean
}

export const categories = {
    beneficiary: { name: 0, minMain: 0 } as Category,
    intermediary: { name: 1, minMain: 1 } as Category,
    implementer: { name: 2, minMain: 1 } as Category,
    donor: { name: 3, minMain: 1 } as Category,
    other: { name: 4, hasNoMain: true } as Category,
}

export interface IStakeholder {
    id: number;
    name: string;
    category: Category;
    main?: boolean;
    orderInGroup: number;
}

export default class Stakeholders {
    list: IStakeholder[];

    constructor(list: IStakeholder[]) {
        this.list = list;
    }

    getStakeholdersByCategory(category: CategoryName): IStakeholder[] {
        switch (category) {
            case 0:
                return this.getBeneficaries();
            case 1:
                return this.getIntermediaries();
            case 2:
                return this.getImplementors();
            case 3:
                return this.getDonors();
            default:
                return this.getOthers();
        }
    }

    getBeneficaries(): IStakeholder[] {
        return this.list.filter(sh => sh.category.name === 0);
    }

    getIntermediaries(): IStakeholder[] {
        return this.list.filter(sh => sh.category.name === 1);
    }

    getImplementors(): IStakeholder[] {
        return this.list.filter(sh => sh.category.name === 2);
    }

    getDonors(): IStakeholder[] {
        return this.list.filter(sh => sh.category.name === 3);
    }

    getOthers(): IStakeholder[] {
        return this.list.filter(sh => sh.category.name === 4);
    }

    addStakeholder(order: number, category: Category): Stakeholders {
        // new Stakeholder
        const newSh = {
            id: this.list.length,
            name: "",
            category: category,
            main: false,
            orderInGroup: order + 1
        } as IStakeholder;

        // Fix rest of orders
        this.getStakeholdersByCategory(category.name).forEach(sibling => {
            if (sibling.orderInGroup >= newSh.orderInGroup) {
                sibling.orderInGroup += 1;
            }
        })

        // now push new element after orders have been fixed
        this.list.push(newSh)
        this.list = this.list.sort((a, b) => a.orderInGroup - b.orderInGroup)

        return this;
    }

    deleteStakeholder(id: number): Stakeholders {
        const node = this.list.find(sh => sh.id === id);

        if (node) {
            // Fix rest of orders
            this.getStakeholdersByCategory(node.category.name).forEach(sibling => {
                if (sibling.orderInGroup >= node.orderInGroup) {
                    sibling.orderInGroup -= 1;
                }
            })

            // if the removed node was the main stakeholder, then asign other stakeholder
            if (node.main && node.category.minMain !== 0) {
                this.getStakeholdersByCategory(node.category.name).find(sh => sh.orderInGroup === 0)!.main = true;
            }

            // Remove node
            this.list = this.list.filter(sh => sh.id !== id).sort((a, b) => a.id - b.id);
        }
        return this;
    }

    setMainStakeholder(id: number): Stakeholders {
        const newMain = this.list.find(sh => sh.id === id)!;
        const previousMain = this.getStakeholdersByCategory(newMain.category.name).find(sh => sh.main === true)!

        // Unset previous main if there is one
        if(previousMain) previousMain.main = false;

        // Set new main
        newMain.main = true;

        return this;
    }

    buidStakeholdersList(): IStakholderInfo[] {
        // Sort items by category and then by id
        return this.list.sort((a, b) => a.category.name - b.category.name || a.orderInGroup - b.orderInGroup).map(sh => {
            return {
                id: sh.id,
                name: sh.name,
                category: sh.category,
                main: sh.main,
                hasSiblings: this.getStakeholdersByCategory(sh.category.name).length > 1,
                orderInGroup: sh.orderInGroup
            } as IStakholderInfo
        });
    }

    buildStakeholdersGroups(translator: Function): IGroup[] {
        const benefCount = this.getBeneficaries().length;
        const intermCount = this.getIntermediaries().length;
        const inpemCount = this.getImplementors().length;
        const donorCount = this.getDonors().length;
        const otherCount = this.getOthers().length;

        const counts = [benefCount, intermCount, inpemCount, donorCount, otherCount]
        let index = 0;

        let groups = [] as IGroup[];

        for (var key in CategoryName) {
            if (CategoryName[key]) {
                groups.push({
                    key: `stakeholder${key}`, name: translator(CategoryName[key]), startIndex: index, count: counts[key]
                })
                index += counts[key];
            }
            else break;
        }
        return groups;
    }
}

export interface IStakholderInfo extends INodeInfo {
    id: number;
    name: string;
    category: Category;
    main: boolean;
    orderInGroup: number;
    hasSiblings?: boolean;
}