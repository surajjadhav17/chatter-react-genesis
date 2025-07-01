
import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentChatId, setCurrentChatId] = useState("1");
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Getting Started",
      lastUpdated: new Date(),
      messages: [
        {
          id: "1",
          content: "Hello! How can I help you today?",
          role: "assistant",
          timestamp: new Date(Date.now() - 60000),
        },
      ],
    },
    {
      id: "2",
      title: "React Questions",
      lastUpdated: new Date(Date.now() - 3600000),
      messages: [
        {
          id: "2",
          content: "Can you help me with React hooks?",
          role: "user",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "3",
          content: "Of course! React hooks are functions that let you use state and other React features in functional components. What specific aspect would you like to learn about?",
          role: "assistant",
          timestamp: new Date(Date.now() - 3500000),
        },
      ],
    },
  ]);

  const currentChat = chatSessions.find(chat => chat.id === currentChatId);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setChatSessions(prev => 
      prev.map(session => 
        session.id === currentChatId
          ? {
              ...session,
              messages: [...session.messages, newMessage],
              lastUpdated: new Date(),
            }
          : session
      )
    );

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message! This is a demo response. In a real application, this would be connected to an AI service.",
        role: "assistant",
        timestamp: new Date(),
      };

      setChatSessions(prev => 
        prev.map(session => 
          session.id === currentChatId
            ? {
                ...session,
                messages: [...session.messages, aiResponse],
                lastUpdated: new Date(),
              }
            : session
        )
      );
    }, 1000);
  };

  const handleNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      lastUpdated: new Date(),
    };

    setChatSessions(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        chatSessions={chatSessions}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={handleNewChat}
      />
      <ChatArea
        currentChat={currentChat}
        onSendMessage={handleSendMessage}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

export default ChatInterface;
