"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseconfig";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Link from "next/link";

const SignIn = () => {
  const navigate = useRouter();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const change = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then(() => {
        navigate.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form action="" className="w-[90%] max-w-sm">
        <div className="font-semibold text-3xl text-zinc-200">Sign In</div>
        <Input
          name="email"
          type={"email"}
          value={details.email}
          labelText={"Email"}
          change={change}
        />
        <Input
          name="password"
          type={"password"}
          value={details.password}
          labelText={"Password"}
          change={change}
        />
        <div className="text-left text-white my-2">
          Don't have an account?{" "}
          <Link href={"/auth/signup"} className="text-blue-200">
            Sign Up{" "}
          </Link>
        </div>
        <button
          onClick={signIn}
          className="bg-blue-200 font-semibold py-1 px-10 rounded-md"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
