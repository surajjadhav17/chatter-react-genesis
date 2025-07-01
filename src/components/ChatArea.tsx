
import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { ChatSession } from "./ChatInterface";

interface ChatAreaProps {
  currentChat?: ChatSession;
  onSendMessage: (content: string) => void;
  isSidebarOpen: boolean;
}

const ChatArea = ({ currentChat, onSendMessage, isSidebarOpen }: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome to ChatGPT Clone
          </h3>
          <p className="text-gray-600">
            Select a chat from the sidebar or start a new conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-lg font-semibold text-gray-800 truncate">
          {currentChat.title}
        </h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {currentChat.messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-600">
                Type your message below to begin chatting
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentChat.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatArea;
