
"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { Bell } from "lucide-react";

import { mockNotifications } from
"../data/mockNotifications";

export default function NotificationBell() {

  const [open, setOpen] =
    useState(false);

  const unreadCount = useMemo(() => {
    return mockNotifications.filter(
      (notification) =>
        !notification.read
    ).length;
  }, []);

  return (
    <div className="relative">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          p-3
          rounded-full
          hover:bg-gray-100
          transition
        "
      >
        <Bell size={24} />

        {/* BADGE */}
        {unreadCount > 0 && (
          <div
            className="
              absolute
              -top-1
              -right-1
              min-w-[22px]
              h-[22px]
              px-1
              rounded-full
              bg-red-500
              text-white
              text-xs
              font-bold
              flex
              items-center
              justify-center
            "
          >
            {unreadCount}
          </div>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute
            right-0
            mt-4
            w-[380px]
            bg-white
            rounded-3xl
            shadow-2xl
            border
            overflow-hidden
            z-50
          "
        >

          {/* HEADER */}
          <div
            className="
              p-5
              border-b
              flex
              justify-between
              items-center
            "
          >
            <h3 className="text-xl font-bold">
              Notifications
            </h3>

            <Link
              href="/dashboard/notifications"
              className="
                text-blue-600
                font-semibold
                text-sm
                hover:underline
              "
            >
              Voir tout
            </Link>
          </div>

          {/* LIST */}
          <div className="max-h-[420px] overflow-y-auto">

            {mockNotifications.map(
              (notification) => (
                <div
                  key={notification.id}
                  className={`
                    p-5
                    border-b
                    hover:bg-gray-50
                    transition

                    ${
                      !notification.read
                        ? "bg-blue-50"
                        : ""
                    }
                  `}
                >
                  <div className="flex gap-3">

                    {!notification.read && (
                      <div
                        className="
                          w-2.5
                          h-2.5
                          rounded-full
                          bg-blue-600
                          mt-2
                        "
                      />
                    )}

                    <div>
                      <h4 className="font-bold">
                        {notification.title}
                      </h4>

                      <p
                        className="
                          text-sm
                          text-gray-600
                          mt-1
                        "
                      >
                        {notification.message}
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-400
                          mt-2
                        "
                      >
                        {notification.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}

          </div>
        </div>
      )}
    </div>
  );
}
