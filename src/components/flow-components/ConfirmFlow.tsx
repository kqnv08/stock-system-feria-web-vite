import { Button, Col, Result, Row, Typography } from "antd";
import React from "react";

const { Link } = Typography;

type ConfirmFlowProps = {
  title: string;
  subtitle?: string;
  requestNumber?: string;
  okTitleButton: string;
  onClickRequestNumber?: () => void;
  onClickOkButton?: () => void;
};

const ConfirmFlow: React.FC<ConfirmFlowProps> = ({
  title,
  subtitle = "",
  requestNumber = "",
  okTitleButton,
  onClickOkButton = () => {},
  onClickRequestNumber = () => {},
}) => {
  return (
    <Result
      status="success"
      title={title}
      subTitle={subtitle}
      extra={[
        <Row gutter={[16, 16]}>
          {requestNumber ? (
            <Col span={24}>
              <Link onClick={onClickRequestNumber}>{`Se generó la solicitud ${requestNumber}.`}</Link>
            </Col>
          ) : null}
          <Col span={24}>
            <Button type="primary" key="confirmBtn" onClick={onClickOkButton}>
              {okTitleButton}
            </Button>
          </Col>
        </Row>,
      ]}
    />
  );
};

export default ConfirmFlow;
