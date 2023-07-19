import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";
import dayjs, { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import React, { useEffect, useState } from "react";

const DatePickerBase = generatePicker<Dayjs>(dayjsGenerateConfig);

type DatePickerProps = {
  value?: Dayjs | string | undefined;
  disabled?: boolean;
  format?: string;
  onChange?: (value: any) => void;
  disabledDate?: (date: Dayjs) => boolean;
  style?: React.CSSProperties;
  placeholder?: string;
};

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { value, format, onChange, style, disabled, disabledDate, placeholder } = props;
  const currentFormat = format ?? 'DD/MM/YYYY';

  const handleChange = (value: Dayjs | string | Date | null, dateString: string) => {
    if (onChange) {
      onChange(value ? String(value) : undefined);
    }
  };

  return (
    <DatePickerBase
      defaultValue={value ? dayjs(value) : undefined}
      format={currentFormat}
      onChange={handleChange}
      disabled={disabled}
      disabledDate={disabledDate}
      placeholder={value && dayjs(value).isValid() ? dayjs(value).format(currentFormat) : (placeholder ?? "Seleccionar...")}
      style={style}
    />
  )
};

export default DatePicker;
