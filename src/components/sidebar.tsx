"use client";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Chat } from "@/data";
import { Link } from "react-router-dom";
import useChatStore from "@/hooks/useChatStore";
import SearchBar from "./search-bar";




interface SidebarProps {
  isCollapsed: boolean;
  chats :  Chat[];
  onClick?: (_id:string) => void;
  isMobile: boolean;
}

export function Sidebar({ chats, isCollapsed }: SidebarProps) {

    const {setSelectedUser} = useChatStore();

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full bg-muted/10 dark:bg-muted/20 gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({chats.length})</span>
          </div>

          <div>
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <SearchBar/>
        {chats.map((chat, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="#"
                    className={cn(
                      buttonVariants({ variant: chat.variant, size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16",
                      chat.variant === "secondary" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    )}
                    onClick={()=>{
                      setSelectedUser(chat._id);
                    }}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={chat.avatar}
                        alt={chat.avatar}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{chat.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {chat.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              to="#"
              onClick={()=>{
                setSelectedUser(chat._id);
              }}
              className={cn(
                buttonVariants({ variant: chat.variant, size: "xl" }),
                chat.variant === "secondary" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                "justify-start gap-4",
              )}
            >
              <Avatar className="flex justify-center items-center relative overflow-visible">
                <AvatarImage
                  src={chat.avatar}
                  alt={chat.avatar}
                  width={6}
                  height={6}
                  className="w-10 h-10 rounded-full"
                />
                { chat.isOnline && <div className="bg-green-400 w-2 h-2 absolute top-0 right-0 rounded-full"></div>}
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{chat.name}</span>
                {chat.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {chat.messages[chat.messages.length - 1].name.split(" ")[0]}
                    :{" "}
                    {chat.messages[chat.messages.length - 1].isLoading
                      ? "Typing..."
                      : chat.messages[chat.messages.length - 1].message}
                  </span>
                )}
              </div>
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}