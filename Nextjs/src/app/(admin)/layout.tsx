
import Sidebar from "@/src/features/dashboard/components/Sidebar";

import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

import {ROLES} from "@/src/constants/roles";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <ProtectedRoute
      allowedRoles={[
        ROLES.ADMIN,
      ]}
    >
      {children}
    </ProtectedRoute>
  );
}
