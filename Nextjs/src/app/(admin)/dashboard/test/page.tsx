
import AuthGuard
from "@/components/auth/AuthGuard";

export default function DashboardPage() {

  return (

    <AuthGuard>

      <div>
        Dashboard sécurisé
      </div>

    </AuthGuard>

  );

}
