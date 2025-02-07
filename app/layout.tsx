import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'
import { NavBar } from './components/NavBar'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <Toaster
              position="top-center"
              reverseOrder={true}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
