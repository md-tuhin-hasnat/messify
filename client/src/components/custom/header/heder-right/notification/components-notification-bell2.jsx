"use client";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { NotificationList } from "./components-notification-list";
import { NotificationDetails } from "./notification-details";
import fetchNotificationByPage from "@/app/actions/get_notification.action";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    loadMoreNotifications();
  }, [page]);

  useEffect(() => {
    if (selectedNotifications.length === 0 && isSelectionMode) {
      setIsSelectionMode(false);
    }
  }, [selectedNotifications, isSelectionMode]);

  const loadMoreNotifications = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const newNotifications = await fetchNotificationByPage({ page });
    if (newNotifications.length === 0) {
      setHasMore(false);
    } else {
      setNotifications([...notifications, ...newNotifications]);
      setPage(page + 1);
    }
    setIsLoading(false);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedNotification(null);
  };

  const handleAction = (action) => {
    console.log(
      `${action} action for notification ${selectedNotification?.id}`
    );
    handleClose();
  };

  const handleDelete = (ids) => {
    setNotifications(notifications.filter((n) => !ids.includes(n.id)));
    setSelectedNotifications([]);
    if (selectedNotifications.length === ids.length) {
      setIsSelectionMode(false);
    }
  };

  const toggleSelectionMode = (notificationId) => {
    setIsSelectionMode(true);
    setSelectedNotifications([notificationId]);
  };

  const toggleNotificationSelection = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map((n) => n.id));
    }
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full"
          >
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 border-border">
          <NotificationList
            notifications={notifications}
            isSelectionMode={isSelectionMode}
            selectedNotifications={selectedNotifications}
            onSelectAll={handleSelectAll}
            onDelete={handleDelete}
            onToggleSelectionMode={toggleSelectionMode}
            onSelect={toggleNotificationSelection}
            onNotificationClick={handleNotificationClick}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={loadMoreNotifications}
          />
        </PopoverContent>
      </Popover>
      <NotificationDetails
        notification={selectedNotification}
        isOpen={isOpen}
        onClose={handleClose}
        onAction={handleAction}
        isMobile={isMobile}
      />
    </>
  );
}
