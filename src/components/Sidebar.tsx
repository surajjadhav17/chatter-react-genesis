
import { Plus, MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSession } from "./ChatInterface";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  chatSessions: ChatSession[];
  currentChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

const Sidebar = ({
  isOpen,
  onToggle,
  chatSessions,
  currentChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        ${isOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button
              onClick={onNewChat}
              className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-2">
            {chatSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSelectChat(session.id)}
                className={`
                  w-full text-left p-3 rounded-lg mb-1 transition-colors group hover:bg-gray-100
                  ${currentChatId === session.id ? 'bg-blue-50 border border-blue-200' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className={`
                      text-sm font-medium truncate
                      ${currentChatId === session.id ? 'text-blue-700' : 'text-gray-800'}
                    `}>
                      {session.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(session.lastUpdated)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="fixed top-4 left-4 z-40 md:hidden bg-white shadow-md hover:shadow-lg"
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default Sidebar;
