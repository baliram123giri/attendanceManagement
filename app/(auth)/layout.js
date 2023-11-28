import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className='min-h-screen w-full flex justify-center items-center'>
                    {children}
                </main>
            </body>
        </html>
    )
}
