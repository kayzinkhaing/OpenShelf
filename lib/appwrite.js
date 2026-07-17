import { Client, Account, Avatars, Databases } from "react-native-appwrite"

export const client = new Client()

client
  .setEndpoint('https://sgp.cloud.appwrite.io/v1')
  .setProject('6a57bf8a000d292642e2')
  .setPlatform('dev.nyxk.shelfie')

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)