import generatePicker, { PickerTimeProps } from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";
import { Omit } from "antd/es/_util/type";
import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import * as React from "react";

const DatePickerBase = generatePicker<Dayjs>(dayjsGenerateConfig);
export interface TimePickerProps
  extends Omit<PickerTimeProps<Dayjs>, "picker"> { }

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <DatePickerBase {...props} picker="time" mode={undefined} ref={ref} />;
});

TimePicker.displayName = "TimePicker";

export default TimePicker;
