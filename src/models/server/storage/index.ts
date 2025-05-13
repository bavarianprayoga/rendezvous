// bikin semua bucket

import setupProfileStorage from "./profileBucket"
import setupVenueStorage from "./venueBucket"
// import { setupPostStorage } from "./postBucket"

export async function initializeAllStorage() {
    try {
        await Promise.all([
            setupProfileStorage(),
            // setupPostStorage(),
            setupVenueStorage()
        ])
        console.log("All storage buckets initialized successfully")
    } catch (error) {
        console.error("Error initializing storage buckets:", error)
        throw error
    }
}

// Export individual setup functions for cases where you only need to set up one bucket
// export { setupProfileStorage, setupVenueStorage, setupPostStorage };
export { setupProfileStorage, setupVenueStorage };