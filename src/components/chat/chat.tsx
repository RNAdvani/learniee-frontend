import { Message, UserData } from "@/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import useChatStore from "@/hooks/useChatStore";
import { Socket } from "socket.io-client";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
  socket? :Socket
}

export function Chat({selectedUser, isMobile,socket}: ChatProps) {
  const messagesState = useChatStore((state) => state.messages);

  const sendMessage = (newMessage: Message) => {
    useChatStore.setState((state) => ({
      messages: [...state.messages, newMessage],
    }));
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
        socket={socket}
      />
    </div>
  );
}
