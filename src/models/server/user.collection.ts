// import {IndexType, Permission} from "node-appwrite"
import {Permission} from "node-appwrite"
import {db, userCollection} from "@/models/name"
import {databases} from "./config"

export default async function createUserCollection() {
    // create collection
    await databases.createCollection(db, userCollection, userCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("User collection created - user.collection.ts")

    // create attributes
    await Promise.all([
        databases.createStringAttribute(db, userCollection, "userId", 100, true),
        databases.createStringAttribute(db, userCollection, "username", 100, true),
        databases.createStringAttribute(db, userCollection, "displayName", 100, true),
        databases.createEmailAttribute(db, userCollection, "email", true),
        databases.createStringAttribute(db, userCollection, "avatar", 100, false),
        databases.createStringAttribute(db, userCollection, "friendIds", 100, false, undefined, true),
        databases.createStringAttribute(db, userCollection, "bio", 2000, false),
        databases.createStringAttribute(db, userCollection, "interests", 100, false, undefined, true),
        databases.createStringAttribute(db, userCollection, "location", 100, false),
    ])
    console.log("User attributes created - user.collection.ts")

    // create indexes (somehow it's not working even though there's no error)
    // await Promise.all([
    //     databases.createIndex(
    //         db, 
    //         userCollection, 
    //         "userId", 
    //         IndexType.Unique,
    //         ["userId"]
    //     ),
    //     databases.createIndex(
    //         db, 
    //         userCollection, 
    //         "username", 
    //         IndexType.Unique,
    //         ["username"]
    //     ),
    //     databases.createIndex(
    //         db, 
    //         userCollection, 
    //         "email", 
    //         IndexType.Unique,
    //         ["email"]
    //     ),
    //     databases.createIndex(
    //         db, 
    //         userCollection, 
    //         "displayName", 
    //         IndexType.Fulltext,
    //         ["displayName"]
    //     ),
    //     databases.createIndex(
    //         db,
    //         userCollection,
    //         "interests",
    //         IndexType.Key,
    //         ["interests"]
    //     )
    // ])
    // console.log("User indexes created - user.collection.ts")
}

