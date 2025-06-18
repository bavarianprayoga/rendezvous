import { databases } from "@/models/server/config";
import { db } from "@/models/name";
import { v4 as uuid } from "uuid";

// === USERS ===
const users = [
  {
    UserId: "f7c82e02-2166-4bce-bec5-9618cd25d920",
    username: "user_f7c82e",
    displayName: "Christina Russell",
    email: "sanchezstacy@jackson.com",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=f7c82e02-2166-4bce-bec5-9618cd25d920&person",
    friendIds: ["90e4b55f-aa4a-422b-880b-85927e36c02c"],
    bio: "Be pass source option hear skin total.",
    location: "Melissabury",
    interests: ["music", "sports"],
  },
  {
    UserId: "90e4b55f-aa4a-422b-880b-85927e36c02c",
    username: "user_90e4b5",
    displayName: "William Ellis",
    email: "lopezmichelle@king.biz",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=90e4b55f-aa4a-422b-880b-85927e36c02c&person",
    friendIds: ["f7c82e02-2166-4bce-bec5-9618cd25d920"],
    bio: "World enough camera today teach.",
    location: "North Brettmouth",
    interests: ["travel", "cooking"],
  },
  {
    UserId: "e77dae09-33fe-4e29-aa1d-b93ddd3a5a57",
    username: "user_e77dae",
    displayName: "Ricky Bryant",
    email: "shelley92@bennett.biz",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=e77dae09-33fe-4e29-aa1d-b93ddd3a5a57&person",
    friendIds: ["f7c82e02-2166-4bce-bec5-9618cd25d920"],
    bio: "Scene address better dog.",
    location: "West David",
    interests: ["sports", "movies"],
  },
  {
    UserId: "d9a4a6aa-b130-4bc4-aee3-fb93e6f1747c",
    username: "user_d9a4a6",
    displayName: "Sabrina Hanson",
    email: "brucebenson@burns.info",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=d9a4a6aa-b130-4bc4-aee3-fb93e6f1747c&person",
    friendIds: ["90e4b55f-aa4a-422b-880b-85927e36c02c"],
    bio: "Nice edge face population authority.",
    location: "East Ronaldport",
    interests: ["tech", "gaming"],
  },
  {
    UserId: "1fc3eae4-4b4e-4236-8618-e0bcd3ebd1f9",
    username: "user_1fc3ea",
    displayName: "Victoria Riley",
    email: "april00@wells.com",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=1fc3eae4-4b4e-4236-8618-e0bcd3ebd1f9&person",
    friendIds: ["d9a4a6aa-b130-4bc4-aee3-fb93e6f1747c"],
    bio: "Smile carry specific newspaper court.",
    location: "North Danielleborough",
    interests: ["books", "nature"],
  },
  {
    UserId: "a5e62fc2-5a1b-4626-985a-5970c7dcfcfb",
    username: "user_a5e62f",
    displayName: "Gregory Paul",
    email: "desireemorris@martinez.info",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=a5e62fc2-5a1b-4626-985a-5970c7dcfcfb&person",
    friendIds: ["1fc3eae4-4b4e-4236-8618-e0bcd3ebd1f9"],
    bio: "Family door itself work radio close.",
    location: "North Teresa",
    interests: ["music", "cooking"],
  },
  {
    UserId: "41716da6-0a5d-4f17-aad7-1509b0b5b0f5",
    username: "user_41716d",
    displayName: "Kelly Marshall",
    email: "charleshall@johnson.biz",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=41716da6-0a5d-4f17-aad7-1509b0b5b0f5&person",
    friendIds: ["a5e62fc2-5a1b-4626-985a-5970c7dcfcfb"],
    bio: "Set front provide sort pattern.",
    location: "Christopherhaven",
    interests: ["nature", "movies"],
  },
  {
    UserId: "112abe0b-f3f5-4f2e-9870-2f013cb0322f",
    username: "user_112abe",
    displayName: "Jessica Craig",
    email: "candacerichards@allen.net",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=112abe0b-f3f5-4f2e-9870-2f013cb0322f&person",
    friendIds: ["41716da6-0a5d-4f17-aad7-1509b0b5b0f5"],
    bio: "Personal evening arm news individual fish.",
    location: "West Derrick",
    interests: ["fitness", "tech"],
  },
  {
    UserId: "a1d8a21f-6c68-4a2d-a5c2-36cb1eb55d9e",
    username: "user_a1d8a2",
    displayName: "Jeffrey Parker",
    email: "veronicajames@steele.io",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=a1d8a21f-6c68-4a2d-a5c2-36cb1eb55d9e&person",
    friendIds: ["112abe0b-f3f5-4f2e-9870-2f013cb0322f"],
    bio: "Author edge clearly defense stand.",
    location: "New Jessicatown",
    interests: ["travel", "books"],
  },
  {
    UserId: "84d7fcff-2823-4cfd-8c4d-40a3cdb8e3fa",
    username: "user_84d7fc",
    displayName: "Angela Cunningham",
    email: "belindawalker@gonzalez.biz",
    password: "P@ssw0rd!",
    avatar:
      "https://source.unsplash.com/featured/200x300?sig=84d7fcff-2823-4cfd-8c4d-40a3cdb8e3fa&person",
    friendIds: ["a1d8a21f-6c68-4a2d-a5c2-36cb1eb55d9e"],
    bio: "Herself local produce month million.",
    location: "South Justin",
    interests: ["gaming", "fitness"],
  },
];

// === VENUES ===
const venues = [
  {
    venueId: "f18a977f-241b-4055-b87a-2c071e47a28d",
    name: "Central Perk",
    category: "Cafe",
    image: "https://source.unsplash.com/featured/200x300?sig=venue1&cafe",
    description: "Cozy place to catch up with friends.",
    upToNPeople: 40,
  },
  {
    venueId: "22ec4d27-abc4-4dfb-a20f-5dc7ed74770b",
    name: "FunZone Arcade",
    category: "Arcade",
    image: "https://source.unsplash.com/featured/200x300?sig=venue2&arcade",
    description: "A lively arcade with retro games.",
    upToNPeople: 30,
  },
  {
    venueId: "9b19c3e3-3907-45b1-b8a5-8d4a635f67f1",
    name: "Golden Garden",
    category: "Restaurant",
    image: "https://source.unsplash.com/featured/200x300?sig=venue3&restaurant",
    description: "Upscale dining experience.",
    upToNPeople: 50,
  },
  {
    venueId: "780313b6-d67a-4f90-af19-b25dddf2f669",
    name: "OpenSky Rooftop",
    category: "Lounge",
    image: "https://source.unsplash.com/featured/200x300?sig=venue4&rooftop",
    description: "Chill vibes with a city view.",
    upToNPeople: 60,
  },
  {
    venueId: "d4c5d1e9-c97e-45b9-b7c2-3a9696cf1132",
    name: "City Park",
    category: "Outdoor",
    image: "https://source.unsplash.com/featured/200x300?sig=venue5&park",
    description: "Open area for outdoor fun.",
    upToNPeople: 100,
  },
];

// === HANGOUTS ===
const hangouts = [
  {
    hangoutId: "202c5fde-0f1d-494b-801a-c458e053cf1e",
    title: "Birthday Bash",
    description: "Join us for a birthday celebration!",
    venueId: "780313b6-d67a-4f90-af19-b25dddf2f669",
    startDateTime: "2025-06-22T10:00:00",
    endDateTime: "2025-06-22T14:00:00",
    maxParticipants: 16,
    isPrivate: false,
    tags: ["birthday", "party"],
    rules: ["No pets allowed"],
    requirements: ["Bring your ID"],
    coverImage:
      "https://source.unsplash.com/featured/200x300?sig=hangout1&party",
    occasion: ["birthday"],
    mood: ["fun"],
    type: ["in-person"],
    createdBy: "e77dae09-33fe-4e29-aa1d-b93ddd3a5a57",
  },
  {
    hangoutId: "b49fcb30-b41b-4f30-9e93-1ae4ed12cd23",
    title: "Tech Meetup",
    description: "Networking with fellow developers.",
    venueId: "22ec4d27-abc4-4dfb-a20f-5dc7ed74770b",
    startDateTime: "2025-06-24T18:00:00",
    endDateTime: "2025-06-24T20:00:00",
    maxParticipants: 25,
    isPrivate: false,
    tags: ["tech", "networking"],
    rules: ["Be respectful"],
    requirements: ["RSVP required"],
    coverImage:
      "https://source.unsplash.com/featured/200x300?sig=hangout2&tech",
    occasion: ["casual"],
    mood: ["focused"],
    type: ["online"],
    createdBy: "d9a4a6aa-b130-4bc4-aee3-fb93e6f1747c",
  },
  {
    hangoutId: "af0ac3e7-8e9d-4a3e-a9f5-88df4f98b6cd",
    title: "Movie Night",
    description: "Chill with friends and popcorn.",
    venueId: "f18a977f-241b-4055-b87a-2c071e47a28d",
    startDateTime: "2025-06-25T20:00:00",
    endDateTime: "2025-06-25T23:00:00",
    maxParticipants: 12,
    isPrivate: true,
    tags: ["movies", "friends"],
    rules: ["Silence your phones"],
    requirements: ["Invite only"],
    coverImage:
      "https://source.unsplash.com/featured/200x300?sig=hangout3&movie",
    occasion: ["casual"],
    mood: ["relaxed"],
    type: ["in-person"],
    createdBy: "41716da6-0a5d-4f17-aad7-1509b0b5b0f5",
  },
  {
    hangoutId: "03ac9e78-4bc4-4fa3-a0c3-e3886e8de235",
    title: "Picnic Day",
    description: "Outdoor games and good vibes.",
    venueId: "d4c5d1e9-c97e-45b9-b7c2-3a9696cf1132",
    startDateTime: "2025-06-26T11:00:00",
    endDateTime: "2025-06-26T16:00:00",
    maxParticipants: 30,
    isPrivate: false,
    tags: ["outdoors", "food"],
    rules: ["Clean up after yourself"],
    requirements: ["Blanket required"],
    coverImage:
      "https://source.unsplash.com/featured/200x300?sig=hangout4&picnic",
    occasion: ["family", "casual"],
    mood: ["chill"],
    type: ["in-person"],
    createdBy: "1fc3eae4-4b4e-4236-8618-e0bcd3ebd1f9",
  },
  {
    hangoutId: "3f9b0f3d-232c-4f67-9c99-0080a3ac1a7a",
    title: "Rooftop Jam",
    description: "Live music and dancing!",
    venueId: "780313b6-d67a-4f90-af19-b25dddf2f669",
    startDateTime: "2025-06-28T19:00:00",
    endDateTime: "2025-06-28T23:00:00",
    maxParticipants: 50,
    isPrivate: false,
    tags: ["music", "dance"],
    rules: ["21+ only"],
    requirements: ["ID check"],
    coverImage:
      "https://source.unsplash.com/featured/200x300?sig=hangout5&rooftop",
    occasion: ["party"],
    mood: ["energetic"],
    type: ["in-person"],
    createdBy: "a5e62fc2-5a1b-4626-985a-5970c7dcfcfb",
  },
];

// === SEEDING FUNCTION ===
async function seedCollection(collectionId: string, data: any[]) {
  for (const doc of data) {
    try {
      await databases.createDocument(db, collectionId, uuid(), doc);
      console.log(`✅ Inserted into ${collectionId}`);
    } catch (err) {
      console.error(`❌ Error inserting into ${collectionId}`, err);
    }
  }
}

async function runSeed() {
  console.log("🌱 Seeding started...");
  await seedCollection("users", users);
  await seedCollection("venues", venues);
  await seedCollection("hangouts", hangouts);
  console.log("✅ All dummy data seeded.");
}

runSeed().catch(console.error);
