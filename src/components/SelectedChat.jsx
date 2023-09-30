"use client";
import Message from "./Message";
import { useEffect, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import { v4 } from "uuid";
import elfStore from "@/state/state";
import Loader from "./Loader";
import { BsPersonCircle } from "react-icons/bs";

const SelectedChat = ({ selected, chatId }) => {
  const { user, profile } = elfStore();
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(null);

  const getSelected = async () => {
    const combined = chatId > user.uid ? chatId + user.uid : user.uid + chatId;

    const docRef = doc(db, "chats/" + combined);
    onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setMessages(snapshot.data().messages);
      } else {
        setMessages([]);
      }
    });

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combined = chatId > user.uid ? chatId + user.uid : user.uid + chatId;

    const docRef = doc(db, "chats", combined);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const newProfile = profile.userChats.map((chat) => {
        if (chat.id === chatId) {
          return { ...chat, lastMessage: messageText, time: Timestamp.now() };
        } else {
          return chat;
        }
      });

      const newSelected = selected.userChats.map((chat) => {
        if (chat.id === profile.uid) {
          return { ...chat, lastMessage: messageText, time: Timestamp.now() };
        } else {
          return chat;
        }
      });

      await updateDoc(doc(db, "users", user.uid), {
        userChats: newProfile,
      });

      await updateDoc(doc(db, "users", chatId), {
        userChats: newSelected,
      });
    } else {
      await updateDoc(doc(db, "users", user.uid), {
        userChats: arrayUnion({
          time: Timestamp.now(),
          name: selected.userName,
          id: chatId,
          lastMessage: messageText,
          photoURL: selected.photoURL,
        }),
      });

      await updateDoc(doc(db, "users", chatId), {
        userChats: arrayUnion({
          time: Timestamp.now(),
          name: profile.userName,
          id: user.uid,
          lastMessage: messageText,
          photoURL: profile.photoURL,
        }),
      });
      const chatRef = doc(db, "chats", combined);
      await setDoc(chatRef, { messages: [] });
    }

    await updateDoc(doc(db, "chats", combined), {
      messages: arrayUnion({
        uid: v4(),
        text: messageText,
        senderId: user.uid,
        date: Timestamp.now(),
      }),
    });
    setMessageText("");
  };

  useEffect(() => {
    setLoading(true);
    if (user && selected) {
      getSelected();
    }
  }, [selected, user]);

  return (
    <div className="grid grid-rows-message h-full">
      <div className="topp flex items-center gap-4 p-2 bg-zinc-900">
        {selected?.photoURL ? (
          <img
            src={selected?.photoURL}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <BsPersonCircle className="w-10 h-10 rounded-full object-cover text-zinc-500" />
        )}
        <div className="name text-blue-100">{selected?.userName}</div>
      </div>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="messages p-2">
          {messages?.map((message) => (
            <Message message={message} key={message.uid} />
          ))}
        </div>
      )}

      <div className="p-2 bg-zinc-900">
        <form
          onSubmit={handleSubmit}
          className="w-full h-10 grid grid-cols-12 gap-4 items-center"
        >
          <textarea
            name="messageText"
            id="message"
            className="w-full col-span-10 resize-none bg-transparent outline-none text-zinc-400"
            placeholder="Type a Message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button className="col-span-2 text-center w-full h-10 flex justify-center items-center">
            <LuSendHorizonal className="text-white mx-auto text-3xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SelectedChat;
