import React from "react";
import { IFilterField } from "./filter-types";
import WidgetBoolean from "./widgets/WidgetBoolean";
import WidgetDate from "./widgets/WidgetDate";
import WidgetList from "./widgets/WidgetList";
import WidgetNumber from "./widgets/WidgetNumber";
import WidgetString from "./widgets/WidgetString";

type WidgetTypeProps = {
  field: IFilterField;
  value?: any;
  onChange?: (value: any) => void;
};

const WidgetType: React.FC<WidgetTypeProps> = ({ field, value, onChange }) => {
  let widget: JSX.Element = <WidgetString value={value} onChange={onChange} />;

  switch (field.type) {
    case "string": {
      widget = <WidgetString value={value} onChange={onChange} />;
      break;
    }
    case "number": {
      widget = <WidgetNumber value={value} onChange={onChange} />;
      break;
    }
    case "boolean": {
      widget = <WidgetBoolean value={value} onChange={onChange} />;
      break;
    }
    case "Date": {
      widget = <WidgetDate value={value} onChange={onChange} />;
      break;
    }
    case "list": {
      widget = (
        <WidgetList value={value} list={field.values} onChange={onChange} />
      );
    }
  }
  return widget;
};

export default WidgetType;
