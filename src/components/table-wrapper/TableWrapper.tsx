import { Table, Button } from "antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { ColumnsType, SorterResult } from "antd/lib/table/interface";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { IAndFilterCriteria, IFilterCriteria } from "../filter/filter-types";
import TableActions from "../utility/TableActions";
import { getFilterCriteria } from "./table-criteria/filter-criteria";
import { getSortCriteria, ISortCriteria } from "./table-criteria/sort-criteria";


export type QueryCriteria = {
  skip?: number;
  max?: number;
  filter?: IFilterCriteria;
  sort?: ISortCriteria;
};

type TableWrapperProps<T> = TableProps<T> & {
  pageInfo?: {
    pageSize: number;
    total: number;
  };
  loading: boolean;
  useDefaultMenu: boolean | ((row: T) => boolean);
  onCriteriaChange: (query: QueryCriteria) => void;
  onUpdate?: (row: T) => Promise<void> | void;
  onDelete?: (row: T) => Promise<void> | void;
  defaultSort?: ISortCriteria;
  initialFilter?: IFilterCriteria;
};

let tableFilters: IAndFilterCriteria;

function TableWrapper<T extends object>(props: React.PropsWithChildren<TableWrapperProps<T>>) {
  const { pageInfo, loading, useDefaultMenu, defaultSort, initialFilter, onUpdate, onDelete, onCriteriaChange } = props;

  const [paginator, setPaginator] = useState({ current: 1, pageSize: pageInfo && pageInfo.pageSize ? pageInfo.pageSize : 10 });
  const [sort, setSort] = useState<ISortCriteria | undefined>(defaultSort);
  const [filter, setFilter] = useState<IFilterCriteria | undefined>(initialFilter);

  useEffect(() => {
    if (initialFilter && !isEqual(initialFilter, filter)) {
      tableFilters ? setFilter({and: [...tableFilters.and, initialFilter]}) : setFilter(initialFilter);
    }
  }, [initialFilter]);

  useEffect(() => {
    if (defaultSort && !isEqual(defaultSort, sort)) setSort(defaultSort);
  }, [defaultSort]);

  const handleEdit = (row: T) => {
    if (onUpdate) onUpdate(row);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: any
  ) => {
    setPaginator({
      current: pagination.current!,
      pageSize: pagination.pageSize!,
    });

    // Set sort
    if (sorter) {
      const sortCriteria = getSortCriteria(sorter) ?? defaultSort;
      setSort(sortCriteria);
    }

    // Set filter
    if (filters) {
      tableFilters = getFilterCriteria(filters);
      if (initialFilter) {
        setFilter({and: [...tableFilters.and, initialFilter]});
      } else {
        setFilter(tableFilters);
      }
    }
  };

  const columns: ColumnsType<T> = props.columns ?? [];

  if (useDefaultMenu) {
    const tableAction = {
      title: "",
      width: "60px",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: T) => (
        <TableActions
          onDeleteClick={onDelete ? () => onDelete(record) : undefined}
          onEditClick={onUpdate ? () => handleEdit(record) : undefined}
        />
      ),
    };

    columns.push(tableAction);
  }

  useEffect(() => {
    onCriteriaChange({
      filter: filter,
      sort: sort,
      max: paginator.pageSize,
      skip: paginator.current * paginator.pageSize - paginator.pageSize,
    });
  }, [filter, sort, paginator]);

  return (
    <>
      <Table
        {...props}
        rowKey="id"
        columns={columns}
        dataSource={props.dataSource}
        onChange={(pag, filters, sorter, extra) => handleTableChange(pag, filters, sorter, extra)}
        pagination={pageInfo ? { ...paginator, ...{ total: pageInfo.total } } : false}
        loading={loading}
      />
    </>
  );
}

export default TableWrapper;
