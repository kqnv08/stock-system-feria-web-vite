import { Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { IFilterField } from "./filter-types";
import { dateOperators } from "./widgets/WidgetDate";
import { listOperators } from "./widgets/WidgetList";
import { numberOperators } from "./widgets/WidgetNumber";
import { stringOperators } from "./widgets/WidgetString";

const { Option } = Select;

type OperatorProps = {
  field: IFilterField;
  value?: any;
  onChange?: (value: any) => void;
};

const Operator: React.FC<OperatorProps> = ({ field, value, onChange }) => {
  const { t } = useTranslation();
  let widget: JSX.Element[] = [];

  switch (field.type) {
    case "boolean": {
      return null;
    }
    case "string": {
      widget = stringOperators.map((item) => (
        <Option value={item.value} key={item.value}>
          {t(item.value)}
        </Option>
      ));
      break;
    }
    case "number": {
      widget = numberOperators.map((item) => (
        <Option value={item.value} key={item.value}>
          {item.display}
        </Option>
      ));
      break;
    }
    case "Date": {
      widget = dateOperators.map((item) => (
        <Option value={item.value} key={item.value}>
          {item.display}
        </Option>
      ));
      break;
    }
    case "list": {
      widget = listOperators.map((item) => (
        <Option value={item.value} key={item.value}>
          {item.display}
        </Option>
      ));
      break;
    }
  }
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={<>{t("FILTER_TYPE")}</>}
      dropdownStyle={{ minWidth: "200px" }}
    >
      {widget}
    </Select>
  );
};

export default Operator;
