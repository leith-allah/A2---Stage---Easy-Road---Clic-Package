
interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterBar({
  options,
  value,
  onChange,
}: FilterBarProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
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
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
