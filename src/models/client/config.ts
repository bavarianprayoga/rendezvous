import env from "@/app/env";

import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID

const databases = new Databases(client)
const account = new Account(client);
const avatars = new Avatars(client);
const profileStorage = new Storage(client);
// const postStorage = new Storage(client);
const venueStorage = new Storage(client);


// export { client, databases, account, avatars, profileStorage, postStorage, venueStorage }
export { client, databases, account, avatars, profileStorage, venueStorage }