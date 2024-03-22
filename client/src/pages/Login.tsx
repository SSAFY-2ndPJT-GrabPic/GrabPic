import { useEffect } from "react";
import { BasicLogin } from "../components/User/BasicLogin";
import { SocailLogin } from "../components/User/SocialLogin";

import { TokenRefresh } from "../api/user";

export const Login: React.FC = () => {

  useEffect(() => {
    autoCheck();
  })

  const autoCheck = async () => {
    await TokenRefresh(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  

  return (
    <div className="flex flex-col px-6">
      <BasicLogin/>
      <SocailLogin/>
    </div>
  );
};

