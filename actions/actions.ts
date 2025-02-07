"use server"

import { clerkClient } from "@clerk/nextjs/server"

interface Card {
  cardNo: string
  expriyDate: string
  cvv: string
}

interface Password {
  website: string,
  username: string,
  password: string
}

export async function addCardServer(cardNo: string, expriyDate: string, cvv: string, userId: string) {

  const client = await clerkClient()

  const user = await client.users.getUser(userId)

  let cards: Card[] = [] 
  // if (Array.isArray(user.privateMetadata.cards)) {
  //   cards = user.privateMetadata.cards || []
  //   cards.push({ cardNo, expriyDate, cvv })
  // }

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: [{cardNo, expriyDate, cvv}]
    },
  })

}


export async function addPasswordServer(website: string, username: string, password: string, userId: string) {
   const client = await clerkClient()

   const user = await client.users.getUser(userId)

   let passwords: Password[] = []
  //  if (Array.isArray(user.privateMetadata.passwords)){
  //   passwords = user.privateMetadata.passwords || []
  //   passwords.push({ website, username, password})
  //  }

   await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: [{website, username, password}]
    }
   })

}