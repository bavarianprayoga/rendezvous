// store venue images/videos

import { Permission } from "node-appwrite"
import { venueBucket } from "@/models/name"
import { venueStorage } from "../config"

export default async function setupVenueStorage() {
    try {
        await venueStorage.getBucket(venueBucket)
        console.log("Venue bucket connected")
    } catch {
        try {
            await venueStorage.createBucket(
                venueBucket, 
                venueBucket,
                [
                    Permission.read("any"),
                    Permission.write("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                    Permission.read("users"),
                ],
                false,
                undefined,
                undefined,
                ["jpg", "png", "gif", "jpeg", "webp", "heic", "heif", "mp4", "mov", "avi", "mkv", "webm"]
            )
            console.log("Venue bucket created")
        } catch (error) {
            console.error("Error creating venue bucket", error)
            throw error
        }
    }
}
