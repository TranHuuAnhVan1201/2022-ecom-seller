import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const RegisterStep1 = React.lazy(() => import("./Step1"));
const RegisterStep2 = React.lazy(() => import("./Step2"));
const RegisterStep3 = React.lazy(() => import("./Step3"));


function RegisterStep(props) {
  return (
    <BrowserRouter>
      <React.Suspense>
        <Switch>
          <Route exact path={"/register"} component={RegisterStep1} />
          <Route path={"/register/step-2"} component={RegisterStep2} />
          <Route path={"/register/step-3"} component={RegisterStep3} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default RegisterStep;
