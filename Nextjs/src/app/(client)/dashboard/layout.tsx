
import Sidebar from "@/features/dashboard/components/Sidebar";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { PackageProvider }
from "@/providers/PackageProvider";

import { ROLES }
from "@/constants/roles";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <PackageProvider>

      <div className="flex min-h-screen bg-gray-50">

        <main className="flex-1 p-6 overflow-y-auto">

          <ProtectedRoute
            allowedRoles={[
              ROLES.CLIENT,
              ROLES.AGENCY,
              ROLES.ADMIN,
              ROLES.SUPER_ADMIN,
              ROLES.OWNER,
            ]}
          >
            {children}
          </ProtectedRoute>

        </main>

      </div>

    </PackageProvider>

  );
}
