import React from "react";
import styled from "styled-components";

const PageTitle: React.FC = ({ children }) => (
  <ComponentTitleWrapper>{children}</ComponentTitleWrapper>
);

const ComponentTitleWrapper = styled.h1`
  font-size: 19px;
  font-weight: 500;
  color: black;
  width: 100%;
  margin-right: 17px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 30px;
  }
`;

export default PageTitle;
