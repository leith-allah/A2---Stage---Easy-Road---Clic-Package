
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  Bell,
  CheckCheck,
  Trash2,
} from "lucide-react";

import { motion, AnimatePresence }
from "framer-motion";

import { Notification } from
"@/types/notification.types";

import { mockNotifications } from
"@/data/mockNotifications";

export default function NotificationBell() {

  const [open, setOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState<Notification[]>(
      mockNotifications
    );

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  // CLOSE OUTSIDE
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // UNREAD
  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) =>
        !notification.read
    ).length;
  }, [notifications]);

  // MARK AS READ
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  // MARK ALL
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // DELETE
  const deleteNotification = (
    id: number
  ) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.id !== id
      )
    );
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >

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
      <AnimatePresence>

        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}

            transition={{
              duration: 0.2,
            }}

            className="
              absolute
              right-0
              mt-4
              w-[420px]
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
              <div>
                <h3 className="text-xl font-bold">
                  Notifications
                </h3>

                <p className="text-sm text-gray-500">
                  {unreadCount} non lue(s)
                </p>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={markAllAsRead}
                  className="
                    text-blue-600
                    hover:text-blue-700
                    transition
                  "
                >
                  <CheckCheck size={20} />
                </button>

                <Link
                  href="/dashboard/notifications"
                  className="
                    text-sm
                    font-semibold
                    text-blue-600
                    hover:underline
                  "
                >
                  Voir tout
                </Link>
              </div>
            </div>

            {/* LIST */}
            <div className="max-h-[450px] overflow-y-auto">

              {notifications.length === 0 && (
                <div className="p-10 text-center">
                  <p className="text-gray-500">
                    Aucune notification.
                  </p>
                </div>
              )}

              {notifications.map(
                (notification) => (
                  <div
                    key={notification.id}
                    onClick={() =>
                      markAsRead(
                        notification.id
                      )
                    }
                    className={`
                      p-5
                      border-b
                      hover:bg-gray-50
                      transition
                      cursor-pointer

                      ${
                        !notification.read
                          ? "bg-blue-50"
                          : ""
                      }
                    `}
                  >
                    <div className="flex gap-4">

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

                      <div className="flex-1">

                        <div
                          className="
                            flex
                            justify-between
                            gap-4
                          "
                        >
                          <h4 className="font-bold">
                            {
                              notification.title
                            }
                          </h4>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              deleteNotification(
                                notification.id
                              );
                            }}
                            className="
                              text-gray-400
                              hover:text-red-500
                              transition
                            "
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <p
                          className="
                            text-sm
                            text-gray-600
                            mt-1
                          "
                        >
                          {
                            notification.message
                          }
                        </p>

                        <p
                          className="
                            text-xs
                            text-gray-400
                            mt-2
                          "
                        >
                          {
                            notification.createdAt
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
