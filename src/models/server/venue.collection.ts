import {IndexType, Permission} from "node-appwrite"
import {db, venueCollection} from "../name"
import {databases} from "./config"

export default async function createVenueCollection() {
    // create collection
    await databases.createCollection(db, venueCollection, venueCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Venue collection created")
    
    // create attributes
    await Promise.all([
        databases.createStringAttribute(db, venueCollection, "venueId", 100, true),
        databases.createStringAttribute(db, venueCollection, "name", 100, true),
        databases.createStringAttribute(db, venueCollection, "location", 1000, true),
        databases.createStringAttribute(db, venueCollection, "description", 2000, false),
        databases.createStringAttribute(db, venueCollection, "image", 256, false, undefined, true),
        databases.createStringAttribute(db, venueCollection, "moodTags", 100, false, undefined, true),
        databases.createStringAttribute(db, venueCollection, "occasionTags", 100, false, undefined, true),
        databases.createStringAttribute(db, venueCollection, "typeTags", 100, false, undefined, true),
        databases.createIntegerAttribute(db, venueCollection, "groupSize", false, 1, 99),
    ])
    console.log("Venue attributes created")

    // create indexes
    await Promise.all([
        databases.createIndex(
            db,
            venueCollection,
            "venueId",
            IndexType.Unique,
            ["venueId"]
        ),
        databases.createIndex(
            db,
            venueCollection,
            "name",
            IndexType.Fulltext,
            ["name"]
        ),
        databases.createIndex(
            db,
            venueCollection,
            "moodTags",
            IndexType.Key,
            ["moodTags"]
        ),
        databases.createIndex(
            db,
            venueCollection,
            "occasionTags",
            IndexType.Key,
            ["occasionTags"]
        ),
        databases.createIndex(
            db,
            venueCollection,
            "typeTags",
            IndexType.Key,
            ["typeTags"]
        ),
        databases.createIndex(
            db,
            venueCollection,
            "groupSize",
            IndexType.Key,
            ["groupSize"]
        )
    ])
    console.log("Venue indexes created")
}

