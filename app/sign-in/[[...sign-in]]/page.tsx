import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <div className="flex justify-center lg:hidden">
                <h1 className="text-3xl text-center font-semibold">Please use on Deskop.</h1>
            </div>
            <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SignIn />
            </div>
        </>
    )
}