"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Check, X } from "lucide-react";

export function NotificationDetails({
  notification,
  isOpen,
  onClose,
  onAction,
  isMobile,
}) {
  const content = (
    <>
      <p>{notification?.fullMessage}</p>
      {notification?.type === "joinRequest" && (
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={() => onAction("approve")} variant="default">
            <Check className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button onClick={() => onAction("reject")} variant="destructive">
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose} side="right">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{notification?.title}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{notification?.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">{content}</div>
      </DialogContent>
    </Dialog>
  );
}
