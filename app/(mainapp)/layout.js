import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import dynamic from 'next/dynamic'
import ReduxStore from '@/Provider/ReduxStore'
import { Suspense } from 'react'
import PageLoader from '@/components/LoadingSpinner/PageLoader'

const Aside = dynamic(() => import('@/components/Aside/Aside'), {
  ssr: false, loading: () => <PageLoader />
})

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxStore>
          <Header />
          <main className='w-full flex lg:h-[90vh] h-[96vh]'>
            <Aside />
            <div className='flex-1 h-full p-4 bg-gray-100 overflow-auto users_messages '>
              {children}
            </div>
          </main>
        </ReduxStore>
      </body>
    </html>
  )
}
