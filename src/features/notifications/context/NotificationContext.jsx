import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getNotifications, markAsRead } from "../services/notificationService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const prevRef = useRef([]);

  const refreshNotifications = useCallback(async () => {
    const res = await getNotifications();
    const newData = res.data.data || res.data;

    setNotifications((prev) => {
      if (JSON.stringify(prevRef.current) !== JSON.stringify(newData)) {
        prevRef.current = newData;
        return newData;
      }

      return prev;
    });
  }, []);

  const markNotificationAsRead = useCallback(async (id) => {
    // update local state direct
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );

    try {
      await markAsRead(id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    refreshNotifications();

    // Polling is centralized here so UI components stay render-only.
    const interval = setInterval(refreshNotifications, 10000);

    return () => clearInterval(interval);
  }, [refreshNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
    [notifications],
  );

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      refreshNotifications,
      markNotificationAsRead,
    }),
    [notifications, unreadCount, refreshNotifications, markNotificationAsRead],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
