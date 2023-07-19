import { SorterResult } from "antd/lib/table/interface";

type SortedProperties = {
    [key: string]: SortField;
};

type SortField = {
    direction: SortDirection
    priority?: number
}

export enum SortDirection {
    Asc = 'ASC',
    Desc = 'DESC'
}

export interface ISortCriteria extends SortedProperties { }

const parseSortDirection = (order: "descend" | "ascend" | null | undefined) => {
    switch (order) {
        case 'descend':
            return SortDirection.Desc;
        case 'ascend':
            return SortDirection.Asc;
        default:
            return undefined;
    }
}

const parseSortField = (key: string | number | (string | number)[], order: SortDirection | undefined, priority: number = 1) => {
    if (!order) return undefined;

    let sortCriteria: any = {};

    if (key instanceof Array) {
        key.reduce((criteria, currentKey, index, array) => {
            if (index === array.length - 1)
                return (criteria[currentKey] = {direction: order, priority: priority});
            return (criteria[currentKey] = {});
        }, sortCriteria);
    } else {
        sortCriteria = { [key]: {direction: order, priority: priority} }
    }

    return sortCriteria;
}

export function getSortCriteria<T>(sorter: SorterResult<T> | SorterResult<T>[]) {
    if (!(sorter instanceof Array) && sorter.column) {
        if (!sorter.columnKey && !sorter.column?.dataIndex) throw Error("Must specify column key or data index");

        let key = sorter.columnKey?.valueOf() ?? sorter.column?.dataIndex;
        let order = parseSortDirection(sorter.order);

        return parseSortField(key! as string | number | (string | number)[], order);
    } else if (sorter instanceof Array && sorter.length) {
        let sortList: ISortCriteria = {};

        sorter.map((sorterItem, index) => {
            if (!sorterItem.columnKey && !sorterItem.column?.dataIndex) throw Error("Must specify column key or data index");
            let key = sorterItem.columnKey?.valueOf() ?? sorterItem.column?.dataIndex;
            let order = parseSortDirection(sorterItem.order);
            const sortCriteriaItem = parseSortField(key! as string | number | (string | number)[], order, index + 1);
            sortList = {
                ...sortList,
                ...sortCriteriaItem
            };
        });

        return sortList ?? undefined;
    } else {
        return undefined;
    }
}

