import React from "react";
import { Redirect, Route } from "wouter";
import useSecurity from "../../hooks/security.hook";
import { PUBLIC_ROUTE } from "../../route.constants";
import { SECURITY_MODULES } from "../../security/security.config";

type ProtectedRouteProps = {
  securityModule?: SECURITY_MODULES;
  index: number;
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ securityModule, index, path, component }: ProtectedRouteProps) => {
  const { isAuthenticated, userHasModulePermission } = useSecurity();

  if (!securityModule) {
    return <Route key={index} path={path} component={component}></Route>;
  }

  //Check if user has permission to enter this module
  if (isAuthenticated() && userHasModulePermission(securityModule)) {
    return <Route key={index} path={path} component={component}></Route>;
  }

  return <Redirect to={PUBLIC_ROUTE.UNAUTHORIZED} />;
};

export default ProtectedRoute;
