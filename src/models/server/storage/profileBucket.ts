// buat nyimpen profile picture, etc

import { Permission } from "node-appwrite"
import { profileBucket } from "@/models/name"
import { profileStorage } from "../config"

export default async function setupProfileStorage() {
    try {
        await profileStorage.getBucket(profileBucket)
        console.log("Profile bucket connected")
    } catch {
        try {
            await profileStorage.createBucket(
                profileBucket,
                profileBucket,
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
                ["jpg", "png", "gif", "jpeg", "webp", "heic", "heif"]
            )
            console.log("Profile bucket created")
        } catch (error) {
            console.error("Error creating profile bucket", error)
            throw error
        }
    }
}   
