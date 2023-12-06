import dynamic from 'next/dynamic'

// import Aside from '@/components/Aside/Aside'
dynamic(() => import('react-toastify/dist/ReactToastify.css'), { ssr: false })
export default function RootLayout({ children }) {
  return children
}
