'use client';
import { useState, useEffect } from 'react'
import Bell from 'lucide-react/dist/esm/icons/bell'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const fetchNotifications = page => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 5 }, (_, i) => ({
        id: page * 5 + i + 1,
        message: `Notification ${page * 5 + i + 1}`,
        date: new Date().toLocaleString()
      })))
    }, 500)
  });
}

export function NotificationBellComponent() {
  const [notifications, setNotifications] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadMoreNotifications()
  }, [])

  const loadMoreNotifications = async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    const newNotifications = await fetchNotifications(page)
    if (newNotifications.length === 0) {
      setHasMore(false)
    } else {
      setNotifications([...notifications, ...newNotifications])
      setPage(page + 1)
    }
    setIsLoading(false)
  }

  return (
    (<Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="bg-background text-foreground">
          <div className="flex items-center justify-between py-2 px-4 border-b">
            <h2 className="text-sm font-semibold">Notifications</h2>
          </div>
          <div className="max-h-[300px] overflow-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground p-4">No notifications</p>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id} className="py-2 px-4">
                    <p className="text-sm">{notification.message}</p>
                    <span className="text-xs text-muted-foreground mt-1 block">{notification.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="py-2 px-4 border-t">
            <Button
              onClick={loadMoreNotifications}
              disabled={isLoading || !hasMore}
              variant="link"
              className="w-full p-0 h-auto font-normal text-xs text-primary hover:text-primary/80">
              {isLoading ? 'Loading...' : hasMore ? 'Load More' : 'No more notifications'}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>)
  );
}