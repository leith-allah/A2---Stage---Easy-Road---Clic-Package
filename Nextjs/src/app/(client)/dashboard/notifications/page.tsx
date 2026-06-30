/*
"use client";

import { useState } from "react";

import NotificationCard from
"@/features/notifications/components/NotificationCard";

import { mockNotifications } from
"@/features/notifications/data/mockNotifications";

export default function NotificationsPage() {

  const [notifications] =
    useState(mockNotifications);

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

//        
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-blue-600">
            Notifications
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Consultez toutes vos notifications.
          </p>
        </div>

        
        <div className="space-y-6">

          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}

        </div>
      </div>
    </section>
  );
}
*/