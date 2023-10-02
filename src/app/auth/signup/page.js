"use client";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase/firebaseconfig";
import Input from "@/components/Input";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import ButtonLoader from "@/components/ButtonLoader";

const SignUp = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    password1: "",
    userName: "",
    photoURL: null,
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useRouter();

  function generateRandomFileName(name) {
    const nameInArray = name.split(".");
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000);
    const randomName = `${timestamp}-${randomNumber}.${nameInArray[1]}`;
    return randomName;
  }
  const onDrop = (accepted) => {
    setFile(accepted[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const signUp = (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      details.email.trim === "" ||
      details.password.trim === "" ||
      details.userName.trim === "" ||
      details.password1.trim === ""
    ) {
      alert("input cannot be empty");
    }

    if (details.password !== details.password1) {
      alert("Passwords don't match");
    }

    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then(async (result) => {
        const user = result.user;
        const { uid, email } = user;
        const newName = generateRandomFileName(file.name);
        const imageRef = ref(storage, `profileImage/${newName}`);

        uploadBytesResumable(imageRef, file).then(() => {
          getDownloadURL(imageRef).then(async (downloadURL) => {
            await setDoc(doc(db, "users", uid), {
              email,
              photoURL: downloadURL,
              userName: details.userName,
              uid,
              userChats: [],
            });
            setLoading(false);
            navigate.push("/");
          });
        });
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const change = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form action="" className="w-[90%] max-w-sm">
        <div className="font-semibold text-3xl text-zinc-200">Sign Up</div>
        <Input
          name="email"
          type={"email"}
          value={details.email}
          labelText={"Email"}
          change={change}
        />
        <Input
          name="userName"
          type={"text"}
          value={details.userName}
          labelText={"User name"}
          change={change}
        />
        <Input
          name="password"
          type={"password"}
          value={details.password}
          labelText={"Password"}
          change={change}
        />

        <Input
          name="password1"
          type={"password"}
          value={details.password1}
          labelText={"Confirm Password"}
          change={change}
        />
        <div className="bg-zinc-700 w-full h-20 flex justify-center items-center over transform duration-300">
          <div {...getRootProps()} className="flex justify-center">
            <input {...getInputProps()} />
            <p className="bg-zinc-700 h-20 w-full flex justify-center items-center cursor-pointer text-white">
              {file ? file.name : "Choose your permanent profile picture"}
            </p>
          </div>
        </div>
        <div className="text-left text-white my-2">
          Already had an account?{" "}
          <Link href={"/auth/signin"} className="text-blue-200">
            Sign In
          </Link>
        </div>
        <button
          onClick={signUp}
          className="bg-zinc-200 font-semibold py-1 px-10 rounded-md flex items-center gap-3 justify-center"
        >
          {loading && <ButtonLoader />}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
