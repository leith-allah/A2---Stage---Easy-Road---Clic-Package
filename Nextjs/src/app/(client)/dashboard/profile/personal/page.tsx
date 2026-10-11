
import PersonalCard from "@/features/profile/components/PersonalCard";
import { getCurrentUser } from "@/server/auth/current-user";

export default async function PersonalPage() {
  const user = await getCurrentUser();

  return <PersonalCard user={user} />;
}
