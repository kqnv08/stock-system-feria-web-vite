import { Input } from "antd";
import React from "react";
import { FilterTypesEnum, OperatorType } from "../filter-types";

export const stringOperators: OperatorType[] = [
  { display: "Es igual a", value: FilterTypesEnum.EQUALS },
  { display: "No es igual a", value: FilterTypesEnum.NOT_EQUALS },
  { display: "Contiene", value: FilterTypesEnum.LIKE },
];

type WidgetStringProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const WidgetString: React.FC<WidgetStringProps> = ({ value, onChange }) => {
  return <Input value={value} onChange={onChange}></Input>;
};

export default WidgetString;
