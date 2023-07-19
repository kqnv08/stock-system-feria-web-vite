import { InputNumber } from "antd";
import React from "react";
import { FilterTypesEnum, OperatorType } from "../filter-types";

export const numberOperators: OperatorType[] = [
  { display: "Es igual a", value: FilterTypesEnum.EQUALS },
  { display: "No es igual a", value: FilterTypesEnum.NOT_EQUALS },
  { display: "Es mayor que", value: FilterTypesEnum.GREATER_THAN },
  { display: "Es mayor o igual que", value: FilterTypesEnum.GREATER_THAN_EQUALS },
  { display: "Es menor que", value: FilterTypesEnum.LOWER_THAN },
  { display: "Es menor o igual que", value: FilterTypesEnum.LOWER_THAN_EQUALS },
];

type WidgetNumberProps = {
  value?: number;
  onChange?: (value: string | number | null | undefined) => void;
};

const WidgetNumber: React.FC<WidgetNumberProps> = ({ value, onChange }) => {
  return <InputNumber value={value} onChange={onChange} />;
};

export default WidgetNumber;
