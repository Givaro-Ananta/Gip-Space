import { Inter } from "next/font/google"
import "./globals.css"
import VisitorCounter from "@/components/VisitorCounter"
import MotionProvider from "@/components/MotionProvider"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Gip'z portfolio",
  description: "Portfolio of Givaro Ananta — AI enthusiast and Data Science student passionate about machine learning and data-driven solutions.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        <MotionProvider>
          {children}
          <VisitorCounter />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}