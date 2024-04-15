import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Loading from "./../loading/Loading";
import axios from "axios";

function ConnectFB(props) {
  const [state, setState] = useState();

  const auth = async () => {
    try {
      const response = fetch(
        "https://services.giaohangtietkiem.vn/authentication-request-sample",
        {
          headers: {
            Token: "0d2161e98a2F087cA3a5682034364e59A4874662",
            "Content-Type": "aplication/json",
          },
          method: "GET",
        }
      )
        .then((res) => {
          console.log("then res =>", res);
        })
        .catch((err) => console.log("catch err =>", err));
      // const res = await response.json();
      if (!response.ok) {
        console.log("not ok", response);
        return;
      }
      console.log("ok", response);
    } catch (err) {
      console.log("catch", err);
    }
  };

  const post = async () => {
    try {
      const response = fetch(
        "https://services.giaohangtietkiem.vn/request-sample",
        {
          body: "{field1:value1,field2:value2}",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Token: "your-API-token-key",
          },
          method: "POST",
        }
      );

      if (!response.ok) {
        console.log("not okk", response);
        return;
      }
      console.log(response);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    auth();
    post();
  }, []);
  return (
    <div>
      <Skeleton />
      <Skeleton count={5} />
      <Loading />
    </div>
  );
}

export default ConnectFB;
