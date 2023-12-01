
import "./notfound.css"
import Link from "next/link";
const NotFound = () => {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <div className="flex gap-2 flex-col h-screen items-center justify-center ">
                    <h1 className="text-9xl font-semibold text-neutral-800  ">4<span className="text-orange-400">0</span>4</h1>
                    <p className="font-semibold tracking-widest">THE PAGE YOU REQUESTED COULD NOT FOUND</p>
                    <Link href={"/login"}> Go</Link>
                </div>
            </body>
        </html>
    );
};

export default NotFound;
