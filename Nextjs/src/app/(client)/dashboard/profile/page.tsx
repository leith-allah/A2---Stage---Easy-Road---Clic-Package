
import ProfileHeader
from "@/features/profile/components/ProfileHeader";

import { getCurrentUser }
from "@/server/auth/current-user";

export default async function ProfilePage() {

    const user =
        await getCurrentUser();

    return (

        <ProfileHeader
            user={user}
        />

    );

}
