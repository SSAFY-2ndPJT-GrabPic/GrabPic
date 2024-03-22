import { useEffect } from "react";
import { BasicLogin } from "../components/User/BasicLogin";
import { SocailLogin } from "../components/User/SocialLogin";

export const Login: React.FC = () => {
  
  // 자동 로그인 구현
  useEffect(() => {

  })

  return (
    <div className="flex flex-col px-6">
      <BasicLogin/>
      <SocailLogin/>
    </div>
  );
};

