// store images/videos

import { Permission } from "node-appwrite"
import { mediaBucket } from "@/models/name"
import { storage } from "./config"

export default async function setupStorage() {
    try {
        await storage.getBucket(mediaBucket)
        console.log("Media bucket connected - mediaStorage.ts")
    } catch {
        try {
            await storage.createBucket(
                mediaBucket, 
                mediaBucket,
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
            console.log("Media bucket created - mediaStorage.ts")
        } catch (error) {
            console.error("Error creating Media bucket - mediaStorage.ts", error)
            throw error
        }
    }
}
