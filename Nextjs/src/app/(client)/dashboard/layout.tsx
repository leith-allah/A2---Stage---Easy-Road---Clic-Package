
import Sidebar from "@/src/features/dashboard/components/Sidebar";

import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

import {ROLES} from "@/src/constants/roles";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}

      <main className="flex-1 p-6 overflow-y-auto">
        <ProtectedRoute
          allowedRoles={[
            ROLES.CLIENT,
            ROLES.AGENCY,
          ]}
        >
          {children}
        </ProtectedRoute>
      </main>
    </div>
  );
}
