import { signIn } from "next-auth/react";
import React from "react";

const SocialLogin = () => {
  const handlerLogin = async (provider) => {
    const res = await signIn(provider);
  };
  return (
    <div className="flex items-center justify-center gap-4">
      <button onClick={() => handlerLogin("google")} className="btn">
        Google
      </button>
      <button onClick={() => handlerLogin("github")} className="btn">
        Github
      </button>
    </div>
  );
};

export default SocialLogin;
