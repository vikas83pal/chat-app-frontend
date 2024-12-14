import { useState, createContext } from "react";

// Create a context
const ChatContext = createContext();

// Create a provider component
export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <ChatContext.Provider value={{ roomId, user, connected, setRoomId, setUser, setConnected }}>
      {children}
    </ChatContext.Provider>
  );
};

// Export the context to be used in other components
export default ChatContext;
