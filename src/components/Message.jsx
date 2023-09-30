import elfStore from "@/state/state";

const Message = ({ message }) => {
  // console.log(message.date);
  const { user } = elfStore();

  return (
    <div
      className={`message flex my-2 ${
        message.senderId === user.uid && "justify-end"
      }`}
    >
      <div
        className={`text-sm max-w-xs rounded-t-lg bg-white p-1 ${
          message.senderId === user.uid ? "rounded-bl-lg" : "rounded-br-lg"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default Message;
