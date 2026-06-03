
import Sidebar from "@/features/dashboard/components/Sidebar";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import {ROLES} from "@/constants/roles";


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
