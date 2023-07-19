export enum FilterTypesEnum {
  EQUALS = "EQUALS",
  IS_NULL = "IS_NULL",
  IS_NOT_NULL = "IS_NOT_NULL",
  GREATER_THAN = "GREATHER_THAN",
  GREATER_THAN_EQUALS = "GREATHER_THAN_EQUALS",
  LOWER_THAN = "LOWER_THAN",
  LOWER_THAN_EQUALS = "LOWER_THAN_EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
  IN = "IN",
  NOT_IN = "NOT_IN",
  LIKE = "LIKE",
}

export type IFilterCriteria = IPropertyFilterCriteria | IAndFilterCriteria | IOrFilterCriteria;
interface IPropertyFilterCriteria extends FilteredProperty {}

export interface IAndFilterCriteria {
  and: IFilterCriteria[];
}

export interface IOrFilterCriteria {
  or: IFilterCriteria[];
}

export type FilteredProperty = {
  [key: string]: {
    value: any;
    type?: FilterTypesEnum;
  };
};

export interface IFilterField {
  name: string;
  type: "string" | "number" | "Date" | "boolean" | "list";
  default: boolean;
  displayName?: string;
  values?: { id: number; value: string }[];
  // values?:
  //   | { id: number; value: string }[]
  //   | (() => { id: number; value: string }[])
  //   | Promise<{ id: number; value: string }[]>;
}

export type OperatorType = {
  display: string;
  value: FilterTypesEnum;
};
