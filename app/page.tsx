import { AddCard } from "@/components/AddCard"
import { AddPassword } from "@/components/AddPassword"
import { YourCards } from "@/components/YourCards"
import { YourPasswords } from "@/components/YourPasswords"
import { Metadata } from "next"
import { currentUser } from "@clerk/nextjs/server"



export const metadata: Metadata = {
  title: "Home",
  description: "Your passwords and credit cards in one place",
}

export default async function Home() {

  const user = await currentUser()
  // console.log(user?.privateMetadata.cards)

  return (
    <div className="container mx-auto px-4 py-2 flex justify-center items-center min-h-screen gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-full w-full justify-items-center">
        <div className="space-y-8 p-4 w-full md:w-3/4">
          <AddCard />
          <YourCards cards={Array.isArray(user?.privateMetadata.cards) ? user?.privateMetadata.cards : []} />
        </div>
        <div className="space-y-8 p-4 w-full md:w-3/4">
          <AddPassword />
          <YourPasswords passwords={Array.isArray(user?.privateMetadata.passwords) ? user?.privateMetadata.passwords : []} />
        </div>
      </div>
    </div>
  )
}

