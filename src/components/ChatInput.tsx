
import { useState, useRef, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      setIsTyping(true);
      onSendMessage(message.trim());
      setMessage("");
      
      // Reset typing state after a delay
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 mb-2 px-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-gray-500">AI is typing...</span>
          </div>
        )}
        
        {/* Input Area */}
        <div className="flex items-end gap-3 bg-gray-50 rounded-2xl p-3 border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            className="flex-1 border-0 bg-transparent resize-none focus:ring-0 focus:outline-none p-0 min-h-[20px] max-h-[120px]"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isTyping}
            size="sm"
            className={`
              rounded-xl transition-all duration-200 flex-shrink-0
              ${message.trim() && !isTyping 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Helper Text */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send, Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
