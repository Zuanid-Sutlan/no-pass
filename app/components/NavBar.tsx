"use client"
import React from 'react'
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SignInButton } from '@clerk/nextjs'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Label } from '@/components/ui/label'

export const NavBar = () => {

    const { setTheme, theme } = useTheme()

    return (
        <nav className='flex justify-between items-center h-16 bg-primary text-primary-foreground'>
            <div className='flex flex-col '>
                <span className='text-2xl font-bold px-4'>Password Manager</span>
                <span className='text-xs font-bold px-4'>Developed by Sultan</span>
            </div>
            <ul className='flex gap-5 justify-start items-center px-4'>
                {/* <li>Home</li>
                <li>About</li>
                <li>Services</li> */}
            </ul>

            <div className='flex px-4 justify-center items-center gap-2'>

                <div className="flex items-center space-x-2">
                    <Button
                        className=' bg-transparent hover:bg-transparent'
                        variant="ghost"
                        size="icon"
                        onClick={() => { setTheme(theme === "dark" ? "light" : "dark") }}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                    </Button>
                </div>

                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>

            </div>
        </nav>
    )
}
