import { Button, Input, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
import DatePicker from "../../date-components/DatePicker";
import { IFilterCriteria, FilterTypesEnum, IAndFilterCriteria } from "../../filter/filter-types";
const { Option } = Select;

export function getFilterCriteria(filter:  Record<string, (string | number | boolean)[] | null>) : IAndFilterCriteria {
    const filterCriteria: IFilterCriteria = {and: []};

    Object.entries(filter).reduce((criteria, filterField) => {
        if (filterField[1]) {
            const keyList = filterField[0].split(".");
            let parsedCriteria: any = {};

            for (let i = 0; i < filterField[1].length; i+=2) {
                keyList.reduce((accumulator, currentKey, index, array) => {
                    if (index === array.length - 1) {
                        const filterType = filterField[1]![i];
                        const filterValue = filterField[1]![i+1];
                        return accumulator[currentKey] = {value: filterValue, type: filterType as FilterTypesEnum}
                    }
                    return (accumulator[currentKey] = {});
                }, parsedCriteria);

                criteria.and.push(parsedCriteria);
                parsedCriteria = {};
            };
        };

        return criteria;
    }, filterCriteria);

    return filterCriteria;
}

export const createTextFilter = (filterType: FilterTypesEnum) => {
    return ({ confirm, clearFilters, selectedKeys, setSelectedKeys }: { confirm: any, clearFilters: any, selectedKeys: any, setSelectedKeys: any }) => {

        return <div style={{ padding: 8 }}>
            <Input
                placeholder={`Filtrar`}
                value={selectedKeys[1]}
                onChange={e => setSelectedKeys([filterType, e.target.value])}
                onPressEnter={(e) => { confirm() }}
                style={{ marginBottom: 8, display: 'block' }}
            />

            <Button type="link" onClick={() => clearFilters()} style={{ width: 90 }}>
                Limpiar
            </Button>
            <Button
                type="link"
                onClick={() => { confirm(); }}
                style={{ width: 90, marginRight: 8 }}
            >
                Filtrar
            </Button>
        </div>
    }
}

export const createSelectFilter = (options: { value: any, label: any }[]) => {
    return ({ confirm, clearFilters, selectedKeys, setSelectedKeys }: { confirm: any, clearFilters: any, selectedKeys: any, setSelectedKeys: any }) => {
        return <div style={{ padding: 8 }}>
            <Select
                placeholder={`Seleccione`}
                value={selectedKeys[1]}
                onChange={e => e == null ? undefined : setSelectedKeys([FilterTypesEnum.EQUALS, e])}
                style={{ marginBottom: 8, display: 'block' }}
            >
                {options.map((o, i) => (<Option key={i} value={o.value}>{o.label}</Option>))}
            </Select>

            <Button type="link" onClick={() => clearFilters()} style={{ width: 90 }}>
                Limpiar
            </Button>
            <Button
                type="link"
                onClick={() => { confirm(); }}
                style={{ width: 90, marginRight: 8 }}
            >
                Filtrar
            </Button>
        </div>
    }
}

export const DateFilter = ({ confirm, clearFilters, selectedKeys, setSelectedKeys }: { confirm: any, clearFilters: any, selectedKeys: any, setSelectedKeys: any }) => {
    return <div style={{ padding: 8 }}>
        <DatePicker
            format="DD/MM/YYYY"
            value={selectedKeys[1] ? dayjs(selectedKeys[1]) : undefined}
            onChange={e => e ? setSelectedKeys([FilterTypesEnum.GREATER_THAN_EQUALS, dayjs(e).startOf("day").toDate(), FilterTypesEnum.LOWER_THAN_EQUALS, selectedKeys[3]]) : undefined}
            style={{ marginBottom: 8, display: 'block' }}
        />
        <DatePicker
            format="DD/MM/YYYY"
            value={selectedKeys[3] ? dayjs(selectedKeys[3]) : undefined}
            onChange={e => e ? setSelectedKeys([FilterTypesEnum.GREATER_THAN_EQUALS, selectedKeys[1], FilterTypesEnum.LOWER_THAN_EQUALS, dayjs(e).endOf("day").toDate()]) : undefined}
            style={{ marginBottom: 8, display: 'block' }}
        />

        <Button
            type="link"
            onClick={() => { confirm(); }}
            style={{ width: 90, marginRight: 8 }}
        >
            Filtrar
        </Button>
        <Button type="link" onClick={() => clearFilters()} style={{ width: 90 }}>
            Limpiar
        </Button>
    </div>
}

export const NumberFilter = ({ confirm, clearFilters, selectedKeys, setSelectedKeys }: { confirm: any, clearFilters: any, selectedKeys: any, setSelectedKeys: any }) => {
    return <div style={{ padding: 8 }}>
        <Input
            type="number"
            placeholder={`Desde`}
            value={selectedKeys[1]}
            onChange={e => e ? setSelectedKeys([FilterTypesEnum.GREATER_THAN_EQUALS, e.target.value, FilterTypesEnum.LOWER_THAN_EQUALS, selectedKeys[3]]) : undefined}
            style={{ marginBottom: 8, display: 'block' }}
        />
        <Input
            placeholder={`Hasta`}
            type="number"
            value={selectedKeys[3]}
            onChange={e => e ? setSelectedKeys([FilterTypesEnum.GREATER_THAN_EQUALS, selectedKeys[1], FilterTypesEnum.LOWER_THAN_EQUALS, e.target.value]) : undefined}
            style={{ marginBottom: 8, display: 'block' }}
        />

        <Button
            type="link"
            onClick={() => { confirm(); }}
            style={{ width: 90, marginRight: 8 }}
        >
            Filtrar
        </Button>
        <Button type="link" onClick={() => clearFilters()} style={{ width: 90 }}>
            Limpiar
        </Button>
    </div>
}