import { BsPersonCircle } from "react-icons/bs";

const ChatSingle = ({ click, chat, chatId }) => {
  return (
    <div
      className={`flex gap-3 p-2 items-center cursor-pointer ${
        chatId === chat.id && "bg-zinc-800"
      }`}
      onClick={() => {
        click(chat.id ?? chat.uid);
      }}
    >
      {chat.photoURL ? (
        <img
          src={chat.photoURL}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <BsPersonCircle className="w-12 h-12 rounded-full object-cover text-zinc-500" />
      )}
      <div className="details">
        <div className="name text-sm font-semibold text-white">
          {chat.name ?? chat.userName}
        </div>
        <div className="name text-xs font-light w-full truncate text-zinc-300">
          {chat.lastMessage ?? ""}
        </div>
      </div>
    </div>
  );
};

export default ChatSingle;
