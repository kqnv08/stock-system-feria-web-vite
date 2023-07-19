import React from "react";
import { Form, Typography } from "antd";

const { Text } = Typography;

type DataDisplayProps = {
  label?: string | null;
  text?: string | null;
};

const DataDisplay: React.FC<DataDisplayProps> = ({ label = "", text = "" }) => {
  return (
    <Form.Item label={label} className="read-only">
      <Text strong>{text}</Text>
    </Form.Item>
  );
};

export default DataDisplay;
