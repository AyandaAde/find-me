"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import MessageList from "./MessageList";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Message } from "ai";

type Props = {
    chatId: number
};

const ChatComponent = ({ chatId }: Props) => {
    const { data, isPending } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: async () => {
            const response = await axios.post<Message[]>("/api/get-messages", { chatId });
            return response.data;
        }
    })
    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: "/api/chat",
        body: {
            chatId
        },
        initialMessages: data || [],

    });
    useEffect(() => {
        const messageContainer = document.getElementById("message-container");
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            })
        }
    })
    return (
        <div className="relative max-h-screen overflow-y-scroll hide-scrollbar" id="messge-container">
            <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
                <h3 className="text-xl font-bold">Chat</h3>
            </div>

            {/* message list */}
            <MessageList messages={messages} isPending={isPending} />
            <form onSubmit={handleSubmit} className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white">
                <div className="flex">
                    <Input value={input} onChange={handleInputChange} placeholder="Ask a question..." className="w-full" />
                    <Button className="bg-blue-600 ml-2 ">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChatComponent