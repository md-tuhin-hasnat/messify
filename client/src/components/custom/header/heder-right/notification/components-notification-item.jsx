"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MessageSquare, MoreVertical, UserPlus } from "lucide-react";

export function NotificationItem({
  notification,
  isSelectionMode,
  isSelected,
  onSelect,
  onDelete,
  onToggleSelectionMode,
  onClick,
}) {
  const renderNotificationIcon = (type) => {
    switch (type) {
      case "joinRequest":
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case "future_event":
        return <Calendar className="h-5 w-5 text-green-500" />;
      case "admin":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <li
      className={`py-2 px-4 flex items-center space-x-2 cursor-pointer hover:bg-accent ${
        notification.isRead ? "opacity-50" : ""
      }`}
      onClick={() =>
        isSelectionMode ? onSelect(notification.id) : onClick(notification)
      }
    >
      {isSelectionMode && (
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(notification.id)}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      {renderNotificationIcon(notification.type)}
      <div className="flex-grow">
        <p className="text-sm">{notification.title}</p>
        <span className="text-xs text-muted-foreground mt-1 block">
          {notification.date}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelectionMode(notification.id);
            }}
          >
            Delete Multiple
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
