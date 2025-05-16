// import {IndexType, Permission} from "node-appwrite"
import {Permission} from "node-appwrite"
import {db, hangoutCollection} from "@/models/name"
import {databases} from "./config"

export default async function createHangoutCollection() {
    // create collection
    await databases.createCollection(db, hangoutCollection, hangoutCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Hangout collection created - hangout.collection.ts")
    
    // create attributes
    await Promise.all([
        databases.createStringAttribute(db, hangoutCollection, "hangoutId", 100, true),
        databases.createStringAttribute(db, hangoutCollection, "name", 100, true),
        databases.createStringAttribute(db, hangoutCollection, "description", 2000, false),
        databases.createStringAttribute(db, hangoutCollection, "creatorId", 100, true),
        databases.createStringAttribute(db, hangoutCollection, "venueId", 100, true),
        databases.createStringAttribute(db, hangoutCollection, "hangoutStatus", 100, true),
        databases.createDatetimeAttribute(db, hangoutCollection, "hangoutDate", true),
        databases.createStringAttribute(db, hangoutCollection, "invitedUserIds", 100, true),
        databases.createStringAttribute(db, hangoutCollection, "joinedUserIds", 100, true),
        databases.createIntegerAttribute(db, hangoutCollection, "groupSize", true, 1, 99),
    ])
    console.log("Hangout attributes created - hangout.collection.ts")

    // create indexes (somehow it's not working even though there's no error)
    // await Promise.all([
    //     databases.createIndex(
    //         db,
    //         hangoutCollection,
    //         "hangoutId",
    //         IndexType.Unique,
    //         ["hangoutId"]
    //     ),
    //     databases.createIndex(
    //         db,
    //         hangoutCollection,
    //         "name",
    //         IndexType.Fulltext,
    //         ["name"]
    //     ),
    //     databases.createIndex(
    //         db,
    //         hangoutCollection,
    //         "venueId",
    //         IndexType.Key,
    //         ["venueId"]
    //     ),
    //     databases.createIndex(
    //         db,
    //         hangoutCollection,
    //         "hangoutDate",
    //         IndexType.Key,
    //         ["hangoutDate"]
    //     )
    // ])
    // console.log("Hangout indexes created - hangout.collection.ts")
}

