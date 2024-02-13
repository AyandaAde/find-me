import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <div className="flex w-screen h-screen bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-800 justify-center items-center lg:hidden">
                <h1 className="text-3xl md:text-5xl text-center font-semibold">Please use on Deskop.</h1>
            </div>
            <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SignIn />
            </div>
        </>
    )
}