import { Inter } from 'next/font/google'
import "./auth.css"
import ReduxStore from '@/Provider/ReduxStore'
const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
                <ReduxStore>
                    <main className='min-h-screen w-full flex justify-center items-center'>
                        {children}
                    </main>
                </ReduxStore>
            </body>
        </html>
    )
}
