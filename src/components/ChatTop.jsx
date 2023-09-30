const ChatTop = () => {
  return (
    <div className="flex justify-between bg-blue-700 p-2">
      <div className="name font-semibold">John Doe</div>
      <div className="flex gap-2 items-center">
        <div className="picture">
          <img
            src="/img/profile.jpg"
            alt=""
            className="w-6 h-6 rounded-full object-cover"
          />
        </div>
        <div className="option"></div>
      </div>
    </div>
  );
};

export default ChatTop;
