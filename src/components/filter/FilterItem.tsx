import { MinusCircleOutlined } from "@ant-design/icons";
import { Checkbox, Form, Select } from "antd";
import { FormInstance } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import React, { useState } from "react";
import { IFilterField } from "./filter-types";
import Operator from "./Operator";
import WidgetType from "./WidgetType";

const { Option } = Select;

const layout = {
  wrapperCol: { span: 24 },
};

type FilterItemProps = {
  defaultField: IFilterField;
  fields: IFilterField[];
  indexKey: number;
  form: FormInstance;
  onRemoveFilter: (indexKey: number) => void;
};

const FilterItem: React.FC<FilterItemProps> = ({
  defaultField,
  fields,
  indexKey,
  form,
  onRemoveFilter,
}) => {
  const [fieldSelected, setFieldSelected] = useState<IFilterField>(
    defaultField
  );

  const onFieldChange = (value: SelectValue) => {
    form.resetFields([
      [indexKey.toString(), "operator"],
      [indexKey.toString(), "value"],
    ]);
    setFieldSelected(fields.find((item) => item?.name === value?.toString())!);
  };

  return (
    <Form.Item {...layout}>
      {indexKey ? (
        <MinusCircleOutlined
          onClick={() => onRemoveFilter(indexKey)}
          style={{ fontSize: "20px", color: "#8c8c8c", marginTop: "6px" }}
        />
      ) : null}
      {/* Attribute selector */}
      <Form.Item
        name={[indexKey, "attribute"]}
        style={{
          display: "inline-block",
          width: "calc(30% - 8px)",
          margin: indexKey ? "0px 10px" : "0px 10px 0px 30px",
        }}
        initialValue={fieldSelected.name}
      >
        <Select onChange={(value) => onFieldChange(value)}>
          {fields.map((item) => (
            <Option value={item.name} key={item.name}>
              {item.displayName ?? item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* End Attribute selector */}

      {/* Operator selector */}
      {fieldSelected.type !== "boolean" ? (
        <Form.Item
          name={[indexKey, "operator"]}
          style={{
            display: "inline-block",
            width: "calc(15% - 8px)",
            margin: "0px 10px",
          }}
        >
          <Operator field={fieldSelected} />
        </Form.Item>
      ) : null}
      {/* End Operator selector */}

      {/* Attribute Value input */}
      {fieldSelected.type !== "boolean" ? (
        <Form.Item
          name={[indexKey, "value"]}
          style={{
            display: "inline-block",
            width: "calc(40% - 8px)",
            margin: "0px 10px",
          }}
        >
          <WidgetType field={fieldSelected} />
        </Form.Item>
      ) : (
        <Form.Item
          name={[indexKey, "value"]}
          style={{
            display: "inline-block",
            width: "calc(40% - 8px)",
            margin: "0px 10px",
          }}
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox />
        </Form.Item>
      )}
      {/*End  Attribute Value input */}
    </Form.Item>
  );
};

export default FilterItem;
