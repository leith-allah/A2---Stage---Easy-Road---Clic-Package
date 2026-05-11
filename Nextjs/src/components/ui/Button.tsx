
type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        px-4
        py-2
        rounded-lg
        bg-blue-600
        text-white
        hover:bg-blue-700
        transition
        duration-300
      "
    >
      {text}
    </button>
  );
}
