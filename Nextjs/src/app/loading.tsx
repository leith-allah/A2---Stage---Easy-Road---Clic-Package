
export default function LoadingPage() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-white
      "
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className="
            w-16
            h-16
            border-4
            border-blue-600
            border-t-transparent
            rounded-full
            animate-spin
          "
        />

        <p className="text-gray-600 text-lg">
          Chargement...
        </p>
      </div>
    </section>
  );
}
