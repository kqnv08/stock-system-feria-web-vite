export interface BaseAudit {
  id: string,
  entityId: number | null,
  dmlType: string | null,
  dmlStamp: Date,
  dmlUser: string | null,
  oldRowData: string | null,
  newRowData: string | null
}