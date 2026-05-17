
import BackButton from "@/src/components/navigation/BackButton";

import ProfileHeader from "@/src/features/profile/components/ProfileHeader";
import SecurityCard from "@/src/features/profile/components/SecurityCard";
import AgencyCard from "@/src/features/profile/components/AgencyCard";

export default function ProfilePage() {
  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Retour */}
        <div className="mb-6">
          <BackButton href="/dashboard" />
        </div>

        {/* Header */}
        <ProfileHeader />

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <SecurityCard />

          <AgencyCard />
        </div>

      </div>
    </section>
  );
}
