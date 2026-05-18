
export default function PreferencesPage() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-10
      "
    >
      <h1 className="text-4xl font-bold mb-10">
        Préférences
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Langue
          </p>

          <select
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          >
            <option>Français</option>
            <option>English</option>
          </select>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Devise
          </p>

          <select
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          >
            <option>DZD</option>
            <option>EUR</option>
            <option>USD</option>
          </select>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Notifications Email
          </p>

          <select
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          >
            <option>Activées</option>
            <option>Désactivées</option>
          </select>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Mode sombre
          </p>

          <select
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          >
            <option>Activé</option>
            <option>Désactivé</option>
          </select>
        </div>

      </div>
    </div>
  );
}
