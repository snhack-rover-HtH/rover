import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import { X, ChevronDown, ChevronUp, Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string | Date;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/notifications.json');
        const data: Notification[] = await response.json();
        setNotifications(data.map(notification => ({
          ...notification,
          date: new Date(notification.date)
        })));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const loadMore = () => {
    setLimit(prevLimit => Math.min(prevLimit + 3, notifications.length));
  };

  const loadLess = () => {
    setLimit(prevLimit => Math.max(prevLimit - 3, 3));
  };

  const dismissAll = () => {
    setNotifications([]);
  };

  return (
    <div className="w-full max-w-full p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-800 flex items-center">
          <Bell className="h-6 w-6 mr-2 text-indigo-600" />
          Notifications
        </h2>
        <Button variant="ghost" size="sm" onClick={dismissAll} className="text-indigo-600 hover:text-indigo-800 transition-colors">
          <X className="h-5 w-5" />
          <span className="sr-only">Dismiss all</span>
        </Button>
      </div>
      <div className="max-h-[400px] overflow-y-auto pr-2">
        <div className="space-y-4">
          {notifications.slice(0, limit).map((notification) => (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-400 hover:border-indigo-600 transition-all duration-300">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-indigo-700">{notification.title}</h3>
                <span className="text-xs text-indigo-500">
                  {notification.date.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{notification.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        {limit > 3 && notifications.length > 3 && (
          <Button variant="outline" size="sm" onClick={loadLess} className="border-indigo-300 text-indigo-700 hover:bg-indigo-100">
            <ChevronUp className="h-4 w-4 mr-1" />
            Show Less
          </Button>
        )}
        {limit < notifications.length && (
          <Button variant="outline" size="sm" onClick={loadMore} className="border-indigo-300 text-indigo-700 hover:bg-indigo-100">
            <ChevronDown className="h-4 w-4 mr-1" />
            Show More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Notifications;