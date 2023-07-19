import generateRangePicker from "antd/es/date-picker/generatePicker/generateRangePicker";

import "antd/es/date-picker/style/index";
import dayjs, { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import React, { useEffect, useState } from "react";

const DatePickerRangerBase = generateRangePicker<Dayjs>(dayjsGenerateConfig);

type DateRangerPickerProps = {
  value?: Dayjs[] | string[] | undefined;
  disabled?: boolean;
  format?: string;
  onChange: (value: any) => void;
  disabledDate?: (date: Dayjs) => boolean;
  style?: React.CSSProperties;
};

const DateRangerPicker: React.FC<DateRangerPickerProps> = (props) => {
  const { value, format, onChange, style, disabled, disabledDate } = props;
  const currentFormat = format ?? 'DD/MM/YYYY';

  const handleChange = (value: any) => {

    if (onChange && value)
      onChange(value);
  }

  return (
    <DatePickerRangerBase
      defaultValue={ value ? [dayjs(value[0]), dayjs(value[1])] :  [dayjs(), dayjs()] }
      format={currentFormat}
      disabled={disabled}
      disabledDate={disabledDate}
      onChange={handleChange}
      style={style}
    />
  )
};

export default DateRangerPicker;
