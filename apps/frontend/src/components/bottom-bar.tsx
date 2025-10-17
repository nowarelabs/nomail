import { Wifi, WifiOff, Mail } from "lucide-react";

export function BottomBar() {
  // Mock data - in a real app, this would come from state/context
  const unreadCount = 3;
  const isConnected = true;
  const totalEmails = 42;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-2">
      {/* Status bar with additional info */}
      <div className="flex justify-between items-center mt-1 pt-1 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          {isConnected ? (
            <Wifi className="h-3 w-3 text-green-500" />
          ) : (
            <WifiOff className="h-3 w-3 text-red-500" />
          )}
          <span>{isConnected ? 'Online' : 'Offline'}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span>{totalEmails} emails</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span>{unreadCount} unread</span>
          </div>
        </div>
      </div>
    </div>
  );
}