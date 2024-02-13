import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
export default async function Home() {

  const { userId } = await auth();
  const isAuth = !!userId;
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <>
      <div className="flex w-screen h-screen bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-800 justify-center lg:hidden">
        <h1 className="text-3xl md:text-5xl text-center font-semibold">Please use on Deskop.</h1>
      </div>
      <div className="hidden lg:block w-screen min-h-screen bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-semibold">Find anything in a PDF</h1>
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="flex mt-2">
              {isAuth && firstChat &&
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>Go to Chats<ArrowRight className="ml-2" /></Button>
                </Link>
              }
            </div>
            <p className="max-w-xl mt-1 text-lg text-slate-600">
              Join millions of people who are using AI to instantly answer questions and understand research.
            </p>
            <div className="w-full mt-4">
              {isAuth ? (
                <FileUpload />
              ) :
                (<Link href="/sign-in">
                  <Button>
                    Login to get started!
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

