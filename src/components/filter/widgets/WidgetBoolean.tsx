import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";

type WidgetBooleanProps = {
  value?: boolean;
  onChange?: (event: CheckboxChangeEvent) => void;
};

const WidgetBoolean: React.FC<WidgetBooleanProps> = ({ value, onChange }) => {
  return <Checkbox checked={value} onChange={onChange} />;
};

export default WidgetBoolean;
