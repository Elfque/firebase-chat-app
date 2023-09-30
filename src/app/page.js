"use client";

import Navbar from "@/components/Navbar";
import elfStore from "@/state/state";
import { useEffect } from "react";
import SearchPart from "@/components/SearchPart";
import ChatSingle from "@/components/ChatSingle";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, getAuthedUser, profile, error } = elfStore();

  const handleSelect = (id) => {
    router.push(`/chat/${id}`);
  };

  useEffect(() => {
    if (!user) {
      getAuthedUser();
    }
    if (error === "signedOut") {
      router.push("/auth/signin");
    }
  }, [user, error]);

  return (
    <div>
      <div className="grid grid-cols-10 h-screen">
        <div className="col-span-3 h-full">
          {/* TOP TITLE */}
          <Navbar profile={profile} />

          {/* SEARCH */}
          <SearchPart />

          {/* Chats */}
          <div className="divide-y-[1px] mt-2 px-4">
            {profile?.userChats.map((chat, idx) => (
              <ChatSingle chat={chat} key={idx} click={handleSelect} />
            ))}
          </div>
        </div>
        <div className="col-span-7 h-full bg-zinc-800">
          <div className="w-full h-full flex justify-center items-center text-6xl text-gray-500">
            Select A Chat
          </div>
        </div>
      </div>
    </div>
  );
}
