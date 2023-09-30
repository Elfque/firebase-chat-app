const SigntBn = ({ click, text }) => {
  return (
    <div>
      <button
        className="py-2 px-8 w-full max-w-md mt-4 transform duration-500 bg-transparent border-2 border-black flex justify-center gap-4 hover:bg-black hover:text-white"
        onClick={click}
      >
        {text}
      </button>
    </div>
  );
};

export default SigntBn;
