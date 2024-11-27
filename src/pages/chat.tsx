import {ChatLayout} from '@/components/chat/chat-layout'


const chat = () => {
   const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const layoutCookie = getCookie("react-resizable-panels:layout");
  const defaultLayout = layoutCookie ? JSON.parse(layoutCookie) : undefined;

  return (
    <div className="w-full h-screen">
      <ChatLayout  defaultLayout={defaultLayout} navCollapsedSize={8} />
    </div>
  );
}

export default chat