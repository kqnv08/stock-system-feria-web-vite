import React from "react";
import { Alert } from "antd";

type ErrorProps = {
  error: string;
  onClose?: () => void;
};

const Error: React.FC<ErrorProps> = ({ error, onClose = () => {} }) => {
  return <Alert message="Ha ocurrido un Error" description={error} type="error" closable onClose={onClose} />;
};

export default Error;
