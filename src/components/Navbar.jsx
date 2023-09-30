"use client";
import { BsPersonCircle } from "react-icons/bs";
import { auth } from "@/firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

const Navbar = ({ profile }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between p-4">
      <div className="name font-semibold text-white text-2xl">
        {profile?.userName}
      </div>
      <div className="flex gap-4 items-center">
        <div className="picture">
          {profile?.photoURL ? (
            <img
              src={profile?.photoURL}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <BsPersonCircle className="w-10 h-10 rounded-full object-cover text-zinc-500" />
          )}
        </div>
        <div className="option">
          <button
            onClick={() => {
              signOut(auth);
              router.push("/auth/signin");
            }}
          >
            <FiLogOut className="text-white hover:text-blue-300 transform duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
