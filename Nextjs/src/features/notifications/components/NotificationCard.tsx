
"use client";

import { Notification } from "../types/notification.types";

type Props = {
  notification: Notification;
};

export default function NotificationCard({
  notification,
}: Props) {
  return (
    <div
      className={`
        rounded-3xl
        p-6
        shadow-md
        border-l-8
        transition

        ${
          notification.type === "SUCCESS"
            ? `
              border-green-500
              bg-green-50
            `
            : notification.type === "ERROR"
            ? `
              border-red-500
              bg-red-50
            `
            : notification.type === "WARNING"
            ? `
              border-yellow-500
              bg-yellow-50
            `
            : `
              border-blue-500
              bg-blue-50
            `
        }

        ${
          !notification.read
            ? "opacity-100"
            : "opacity-70"
        }
      `}
    >
      <div className="flex justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">
            {notification.title}
          </h3>

          <p className="text-gray-700 mt-2">
            {notification.message}
          </p>
        </div>

        {!notification.read && (
          <div
            className="
              w-3
              h-3
              rounded-full
              bg-blue-600
              mt-2
            "
          />
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {notification.createdAt}
      </div>
    </div>
  );
}
