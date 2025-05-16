import env from "@/app/env";

import {Avatars, Client, Databases, Storage, Users} from "node-appwrite";

const client = new Client()

client
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)
    .setKey(env.appwrite.apikey)
;

const databases = new Databases(client)
const avatars = new Avatars(client)
const users = new Users(client)
const storage = new Storage(client)

// export { client, databases, avatars, users, profileStorage, postStorage, venueStorage }
export { client, databases, avatars, users, storage }
