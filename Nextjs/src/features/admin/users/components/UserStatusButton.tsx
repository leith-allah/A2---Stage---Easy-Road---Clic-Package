
"use client";

type Props = {
  status: "ACTIVE" | "SUSPENDED";

  onStatusChange: () => void;
};

export default function UserStatusButton({
  status,
  onStatusChange,
}: Props) {
  const isActive =
    status === "ACTIVE";

  return (
    <button
      onClick={onStatusChange}
      className={`
        py-3
        rounded-full
        font-semibold
        transition

        ${
          isActive
            ? `
              bg-red-100
              text-red-600
              hover:bg-red-200
            `
            : `
              bg-green-100
              text-green-700
              hover:bg-green-200
            `
        }
      `}
    >
      {isActive
        ? "Suspendre"
        : "Réactiver"}
    </button>
  );
}
