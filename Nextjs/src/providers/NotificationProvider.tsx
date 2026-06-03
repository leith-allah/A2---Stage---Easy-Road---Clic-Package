
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createNotification,
  getNotifications,
  markAsRead,
} from "@/features/notifications/services/notification.service";

import {
  Notification,
} from "@/features/notifications/types/notification.types";

type NotificationContextType = {
  notifications:
    Notification[];

  loading: boolean;

  create:
    typeof createNotification;

  read:
    (id: number) => Promise<void>;

  refresh:
    () => Promise<void>;
};

const NotificationContext =
  createContext<
    NotificationContextType
      | undefined
  >(undefined);

export function
NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [
    notifications,
    setNotifications,
  ] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {

    const data =
      await getNotifications();

    setNotifications([...data]);
  }

  useEffect(() => {

    async function load() {

      await refresh();

      setLoading(false);
    }

    load();

  }, []);

  async function create(
    data: Parameters<
        typeof createNotification
    >[0]
  ) {

    const notification =
        await createNotification(
        data
        );

    await refresh();

    return notification;
  }

  async function read(
    id: number
  ) {

    await markAsRead(id);

    await refresh();
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        create,
        read,
        refresh,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function
useNotificationContext() {

  const context =
    useContext(
      NotificationContext
    );

  if (!context) {
    throw new Error(
      "NotificationProvider manquant"
    );
  }

  return context;
}
