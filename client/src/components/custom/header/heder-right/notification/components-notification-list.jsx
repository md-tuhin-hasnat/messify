"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { NotificationItem } from "./components-notification-item";
import { ScrollArea } from "@/components/ui/scroll-area";

export function NotificationList({
  notifications,
  isSelectionMode,
  selectedNotifications,
  onSelectAll,
  onDelete,
  onToggleSelectionMode,
  onSelect,
  onNotificationClick,
  isLoading,
  hasMore,
  onLoadMore,
}) {
  return (
    <div className="bg-background text-foreground">
      <div className="flex items-center justify-between py-2 px-4 border-b border-border">
        <h2 className="text-lg font-semibold">Notifications</h2>
        {isSelectionMode && (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onSelectAll}>
              {selectedNotifications.length === notifications.length
                ? "Deselect All"
                : "Select All"}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(selectedNotifications)}
              disabled={selectedNotifications.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <ScrollArea className="h-novh">
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground p-4">
            No notifications
          </p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isSelectionMode={isSelectionMode}
                isSelected={selectedNotifications.includes(notification.id)}
                onSelect={onSelect}
                onDelete={(id) => onDelete([id])}
                onToggleSelectionMode={onToggleSelectionMode}
                onClick={onNotificationClick}
              />
            ))}
          </ul>
        )}
      </ScrollArea>
      <div className="py-2 px-4 border-t border-border flex justify-between items-center">
        <Button
          onClick={onLoadMore}
          disabled={isLoading || !hasMore}
          variant="link"
          className="p-0 h-auto font-normal text-xs text-primary hover:text-primary/80"
        >
          {isLoading
            ? "Loading..."
            : hasMore
            ? "Load More"
            : "No more notifications"}
        </Button>
      </div>
    </div>
  );
}
