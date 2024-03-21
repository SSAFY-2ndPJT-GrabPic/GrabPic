import { BasicLogin } from "../components/User/BasicLogin";
import { SocailLogin } from "../components/User/SocialLogin";

export const Login: React.FC = () => {

  return (
    <div className="flex flex-col px-6">
      <BasicLogin/>
      <SocailLogin/>
    </div>
  );
};

