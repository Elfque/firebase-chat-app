"use client";

import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import ChatSingle from "./ChatSingle";
import { useRouter } from "next/navigation";

const SearchPart = () => {
  const [searchQuery, setSeachQuery] = useState("");
  const [searchResult, setSeachResult] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery === "") {
      return;
    }

    const q = query(
      collection(db, "users"),
      where("userName", "==", searchQuery)
    );

    const querySnapshot = await getDocs(q);
    const newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
    setSeachResult(newArray);
  };

  const handleSelect = (id) => {
    setSeachResult([]);
    setSeachResult("");
    router.push(`/chat/${id}`);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="mx-4 rounded-md">
        <input
          type="text"
          value={searchQuery}
          className="w-full bg-zinc-800 outline-none rounded-md p-1 text-white"
          placeholder="Search Chat"
          onChange={(e) => setSeachQuery(e.target.value)}
        />
      </form>
      <div className="searched px-4">
        {searchResult.length > 0 &&
          searchResult?.map((searched) => (
            <ChatSingle
              key={searched.uid}
              chat={searched}
              click={handleSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPart;
