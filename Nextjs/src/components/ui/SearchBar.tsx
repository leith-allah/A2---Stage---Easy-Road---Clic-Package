
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher...",
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full
        bg-white
        border
        rounded-2xl
        px-5
        py-4
        shadow-sm
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    />
  );
}
