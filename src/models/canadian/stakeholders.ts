import { IGroup } from '@fluentui/react';
import INodeInfo from 'models/nodeinfo';

export enum Category { "beneficiary", "intermediary", "implementer", "donor", "other" }

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

    getStakeholdersByCategory(category: Category): IStakeholder[] {
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
        return this.list.filter(sh => sh.category === 0);
    }

    getIntermediaries(): IStakeholder[] {
        return this.list.filter(sh => sh.category === 1);
    }

    getImplementors(): IStakeholder[] {
        return this.list.filter(sh => sh.category === 2);
    }

    getDonors(): IStakeholder[] {
        return this.list.filter(sh => sh.category === 3);
    }

    getOthers(): IStakeholder[] {
        return this.list.filter(sh => sh.category === 4);
    }

    addStakeholder(order: number, category: Category): Stakeholders {
        // new Stakeholder
        const newSh = {
            id: this.list.length,
            name: "new name",
            category: category,
            main: false,
            orderInGroup: order + 1
        } as IStakeholder;

        // Fix rest of orders
        const siblings = this.getStakeholdersByCategory(category).forEach(sibling => {
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
            this.list = this.list.filter(sh => sh.id !== id).sort((a, b) => a.id - b.id);

            // Fix rest of orders
            this.getStakeholdersByCategory(node.category).forEach(sibling => {
                if (sibling.orderInGroup >= node.orderInGroup) {
                    sibling.orderInGroup -= 1;
                }
            })

            // if the removed node was the main stakeholder, then asign other stakeholder
            if (node.main) {
                this.getStakeholdersByCategory(node.category)[0].main = true;
            }
        }
        return this;
    }

    setMainStakeholder(id: number): Stakeholders {
        const newMain = this.list.find(sh => sh.id === id)!;
        const previousMain = this.getStakeholdersByCategory(newMain.category).find(sh => sh.main === true)!

        // Unset previous main
        previousMain.main = false;
        // Set new main
        newMain.main = true;

        return this;
    }

    buidStakeholdersList(): IStakholderInfo[] {
        // Sort items by category and then by id
        return this.list.sort((a, b) => a.category - b.category || a.orderInGroup - b.orderInGroup).map(sh => {
            return {
                id: sh.id,
                name: sh.name,
                category: sh.category,
                main: sh.main,
                hasSiblings: this.getStakeholdersByCategory(sh.category).length > 1,
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

        for (var key in Category) {
            if (Category[key]) {
                groups.push({
                    key: `stakeholder${key}`, name: translator(Category[key]), startIndex: index, count: counts[key]
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