import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications, markAsRead } from "../../services/notificationService";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  ///fetch notification
  useEffect(() => {
    const fetchNotifications = () => {
      getNotifications()
        .then((res) => {
          setNotifications(res.data.data || res.data);
        })
        .catch((err) => console.error(err));
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, []);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  ///notifications mark as read
  const handleMarkAsRead = async (id) => {
    await markAsRead(id);

    // 👇 refresh notifications
    const res = await getNotifications();
    setNotifications(res.data.data || res.data);
  };

  return (
    <div ref={notifRef} className="relative flex">
      <button
        onClick={() => setNotifOpen(!notifOpen)}
        className="relative flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-slate-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
                      a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
                      C7.67 6.165 6 8.388 6 11v3.159
                      c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1
                      a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {notifOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border rounded-xl shadow-lg p-3 space-y-2 z-50 transition-all duration-200 origin-top scale-95 opacity-0 animate-fade-in">
          {notifications.length === 0 ? (
            <p className="text-sm text-slate-500 text-center">
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                    console.log(n.auction_id);
                  if (n.auction_id) {
                    navigate(`/auctions/${n.auction_id}`);
                  }
                  handleMarkAsRead(n.id);
                  setNotifOpen(false);
                }}
                className={`p-2 rounded-lg text-sm cursor-pointer transition ${
                  !n.is_read ? "bg-indigo-50 font-medium" : "hover:bg-slate-50"
                }`}
              >
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
