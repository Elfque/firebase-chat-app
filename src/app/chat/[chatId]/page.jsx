"use client";

import Navbar from "@/components/Navbar";
import elfStore from "@/state/state";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import SearchPart from "@/components/SearchPart";
import SelectedChat from "@/components/SelectedChat";
import { useParams } from "next/navigation";
import ChatSingle from "@/components/ChatSingle";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { chatId } = useParams();

  const { user, getAuthedUser, profile, error } = elfStore();
  const [selectedChat, setSelectedChat] = useState(null);

  const getProfile = async () => {
    const docRef = doc(db, "users", chatId);
    const docSnap = await getDoc(docRef);
    setSelectedChat(docSnap.data());
  };

  const handleSelect = (id) => {
    router.push(`/chat/${id}`);
  };

  useEffect(() => {
    if (user) {
      getProfile();
    } else {
      getAuthedUser();
    }
    if (error === "signedOut") {
      router.push("/auth/signin");
    }
  }, [chatId, user, error]);

  return (
    <div>
      <div className="grid grid-cols-chat h-screen">
        <div className="h-full">
          {/* TOP TITLE */}
          <Navbar profile={profile} />

          {/* SEARCH */}
          <SearchPart />

          {/* Chats */}
          <div className="mt-2 px-4">
            {profile?.userChats
              .sort((a, b) => b.time - a.time)
              .map((chat, idx) => (
                <ChatSingle
                  chat={chat}
                  key={idx}
                  click={handleSelect}
                  chatId={chatId}
                />
              ))}
          </div>
        </div>
        <div className="h-full bg-zinc-800">
          <SelectedChat selected={selectedChat} chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default Page;
