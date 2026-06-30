
import LoginForm
from "@/features/auth/components/LoginForm";

export default function LoginPage() {

  return (

    <section
      className="
        flex
        flex-col
        items-center
        justify-center
        py-20
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          shadow-lg
          rounded-xl
          p-8
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
          "
        >
          Connexion
        </h1>

        <LoginForm />

      </div>

    </section>

  );

}
