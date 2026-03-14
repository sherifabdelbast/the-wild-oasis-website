"use client";

import { signInWithGoogle, signInWithFacebook } from "@/app/_lib/auth-client";

function SignInButton() {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={signInWithGoogle}
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
      >
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={24}
          width={24}
        />
        <span>Continue with Google</span>
      </button>

      <button
        onClick={signInWithFacebook}
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
      >
        <img
          src="https://authjs.dev/img/providers/facebook.svg"
          alt="Facebook logo"
          height={24}
          width={24}
        />
        <span>Continue with Facebook</span>
      </button>
    </div>
  );
}

export default SignInButton;
