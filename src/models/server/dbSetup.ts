import { db } from "@/models/name";
import createVenueCollection from "./venue.collection";
import createHangoutCollection from "./hangout.collection";
import createUserCollection from "./user.collection";
import setupStorage from "./mediaStorage";

import { databases } from "./config";

export default async function setupDB() {
  try {
    await databases.get(db);
    console.log("Database connected");
  } catch {
    try {
      await databases.create(db, db);
      console.log("Database created");
      // create collections and storage
      await Promise.all([
        createVenueCollection(),
        createHangoutCollection(),
        createUserCollection(),
        setupStorage(),
      ]);
      console.log("Collections created");
      console.log("Database setup complete");
    } catch (error) {
      console.error("Error creating database", error);
      throw error;
    }
  }

  return databases;
}
