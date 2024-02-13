import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
type Props = {
    params: {
        chatId: string
    }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
    const { userId } = await auth();
    if (!userId) {
        return redirect("/sign-in");

    }
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
    if (!_chats) {
        return redirect("/")
    }
    if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
        return redirect("/");
    }
    const currentChat = _chats.find(chat => chat.id === parseInt(chatId));
    return (
        <>
            <div className="flex w-screen h-screen bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-800 justify-center lg:hidden">
                <h1 className="text-3xl md:text-5xl text-center font-semibold">Please use on Deskop.</h1>
            </div>
            <div className="flex max-h-screen overflow-y-scroll hide-scrollbar">
                <div className="flex w-full max-h-screen overflow-y-scroll hide-scrollbar">
                    {/* Chat sidebar */}
                    <div className="flex-[1] max-w-xs">
                        <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
                    </div>
                    {/* pdf viewer */}
                    <div className="max-h-screen p-4 overflow-y-scroll hide-scrollbar flex-[5]">
                        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
                    </div>
                    {/* chat component */}
                    <div className="flex-[3] border-1-4 border-l-slate-200">
                        <ChatComponent chatId={parseInt(chatId)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage