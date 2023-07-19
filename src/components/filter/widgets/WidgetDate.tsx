import { Dayjs } from "dayjs";
import React from "react";
import DatePicker from "../../date-components/DatePicker";
import { FilterTypesEnum, OperatorType } from "../filter-types";

export const dateOperators: OperatorType[] = [
  { display: "Es igual a", value: FilterTypesEnum.EQUALS },
  { display: "Despues de", value: FilterTypesEnum.GREATER_THAN },
  { display: "Despues de o igual que", value: FilterTypesEnum.GREATER_THAN_EQUALS },
  { display: "Antes de", value: FilterTypesEnum.LOWER_THAN },
  { display: "Antes de o igual que", value: FilterTypesEnum.LOWER_THAN_EQUALS },
];

type WidgetDateProps = {
  value?: Dayjs | undefined;
  onChange?: (value: any) => void;
};

const WidgetDate: React.FC<WidgetDateProps> = ({ value, onChange }) => {
  return <DatePicker value={value} onChange={onChange} />;
};

export default WidgetDate;
