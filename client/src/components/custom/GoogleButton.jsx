import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      
    }
  });
  return (
    <button
      onClick={() => {
        login();
      }}
      className="border py-3 px-4 rounded flex items-center gap-4 text-gray-500"
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
