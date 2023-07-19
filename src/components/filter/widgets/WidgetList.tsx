import { Form, Select } from "antd";
import React from "react";
import { FilterTypesEnum, OperatorType } from "../filter-types";
const { Option } = Select;

export const listOperators: OperatorType[] = [
  { display: "Es igual a", value: FilterTypesEnum.EQUALS },
  { display: "No es igual a", value: FilterTypesEnum.NOT_EQUALS },
  // { display: "Es mayor que", value: FilterTypes.GreatherThan },
  // { display: "Es mayor o igual que", value: FilterTypes.GreatherThanEquals },
  // { display: "Es menor que", value: FilterTypes.LowerThan },
  // { display: "Es menor o igual que", value: FilterTypes.LowerThanEquals },
];

type WidgetListProps = {
  value?: any;
  list?: { id: number; value: string }[];
  onChange?: (value: any) => void;
};

const WidgetList: React.FC<WidgetListProps> = ({ value, list, onChange }) => {

  return <Select value={value} onChange={onChange}
    showSearch
    filterOption={(input, option) =>
      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }>
     {list?.map((item) => (
      <Option value={item.id} key={item.id}>
        {item.value}
      </Option>
    ))}
  </Select>;
};

export default WidgetList;
