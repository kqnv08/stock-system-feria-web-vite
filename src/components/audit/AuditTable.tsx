import { Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { ISortCriteria } from "../../components/table-wrapper/table-criteria/sort-criteria";
import TableWrapper, { QueryCriteria } from "../../components/table-wrapper/TableWrapper";
import { IFilterCriteria } from "../filter/filter-types";
import { BaseAudit } from "./BaseAudit";


export const auditDmlTypeDict: { [id: string] : string; } = {
  "INSERT": "Creacion",
  "UPDATE": "Modificacion",
  "DELETE": "Eliminacion"
}
interface AuditTableProps<T extends BaseAudit> {
    dataSource: T[],
    loading: boolean,
    onCriteriaChange: (query: QueryCriteria) => void,
    columnNames?: { [id: string] : string },
    defaultSort?: ISortCriteria,
    initialFilter?: IFilterCriteria,
    pageInfo?: {
        pageSize: number;
        total: number;
    },
}

function AuditTable<T extends BaseAudit>(props: React.PropsWithChildren<AuditTableProps<T>>) {
  const { pageInfo, loading, dataSource, columnNames, defaultSort, initialFilter, onCriteriaChange } = props;

  const expandedRowRender = (record: T) => {
    const oldData = record.oldRowData ? JSON.parse(record.oldRowData) : null;
    const newData = record.newRowData ? JSON.parse(record.newRowData) : null;

    const columns = record.dmlType === "UPDATE" ? [
      { title: 'Columna', dataIndex: 'column', key: 'column' },
      { title: 'Valor previo', dataIndex: 'oldValue', key: 'oldValue', className: "hide" },
      { title: 'Valor nuevo', dataIndex: 'newValue', key: 'newValue' },
    ] : [
      { title: 'Columna', dataIndex: 'column', key: 'column' },
      { title: 'Valor', dataIndex: 'newValue', key: 'newValue' },
    ];

    const data = [];
    for (const column in newData) {
      if (!newData[column]) continue;
      data.push({
        column: columnNames![column] ?? column,
        oldValue: oldData ? oldData[column] : null,
        newValue: newData[column]
      });
    }

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: {
        multiple: 1,
      },
    },
    {
      title: "Tipo",
      dataIndex: "dmlType",
      key: "dmlType",
      sorter: {
        multiple: 2,
      },
      render: (text: string, _: any) => (
        <div>{auditDmlTypeDict[text]}</div>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "dmlStamp",
      key: "dmlStamp",
      sorter: {
        multiple: 4,
      },
      render: (text: any, _: any) => (
        <div>{dayjs(text).format("DD-MM-YYYY HH:mm")}</div>
      ),
    },
    {
        title: "Usuario",
        dataIndex: "dmlUser",
        key: "dmlUser",
        sorter: {
            multiple: 4,
        },
    },
  ];

  return (
    <TableWrapper
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        useDefaultMenu={false}
        onCriteriaChange={onCriteriaChange}
        pageInfo={pageInfo}
        defaultSort={defaultSort}
        initialFilter={initialFilter}
        expandable={{
          expandedRowRender
        }}
    />
  );
};

export default AuditTable;
