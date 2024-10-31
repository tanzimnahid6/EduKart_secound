import { doSocialLogin } from "@/app/actions/social_login";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
export const GoogleLogin = () => {
  return (
    <>
      <form action={doSocialLogin}>
        <button
          type="submit"
          name="action"
          value={"google"}
          className="w-full flex my-4 items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>
      </form>
    </>
  );
};
