import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import { X, ChevronDown, ChevronUp } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string | Date; // Allow date to be either string or Date
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [limit, setLimit] = useState(3);

  // Fetch notifications from JSON file
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/notifications.json'); // Adjust path if necessary
        const data: Notification[] = await response.json();
        setNotifications(data.map(notification => ({
          ...notification,
          date: new Date(notification.date) // Convert string to Date
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
    <div className="w-full max-w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Button variant="ghost" size="sm" onClick={dismissAll}>
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss all</span>
        </Button>
      </div>
      <div className="mt-4 max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {notifications.slice(0, limit).map((notification) => (
            <div key={notification.id} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{notification.title}</h3>
                <span className="text-xs text-gray-500">
                  {notification.date.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{notification.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {limit > 3 && notifications.length > 3 && (
          <Button variant="outline" size="sm" onClick={loadLess} className="mr-2">
            <ChevronUp className="h-4 w-4 mr-1" />
            Show Less
          </Button>
        )}
        {limit < notifications.length && (
          <Button variant="outline" size="sm" onClick={loadMore}>
            <ChevronDown className="h-4 w-4 mr-1" />
            Show More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Notifications;
