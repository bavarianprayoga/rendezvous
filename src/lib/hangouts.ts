// import { databases } from '@/models/client/config'
// import { db, hangoutCollection } from '@/models/name'

// export interface Hangout {
//   hangoutId: string
//   title: string
//   description: string
//   venueId: string
//   startDateTime: string
//   endDateTime: string
//   maxParticipants: number
//   isPrivate: boolean
//   tags: string[]
//   rules: string[]
// }

// export async function getAllHangouts(): Promise<Hangout[]> {
//   const res = await databases.listDocuments(db, hangoutCollection)
//   return res.documents as unknown as Hangout[]
// }

// export async function getHangoutById(id: string): Promise<Hangout | null> {
//   try {
//     const res = await databases.getDocument(db, hangoutCollection, id)
//     return res as unknown as Hangout
//   } catch (error) {
//     console.error('Error fetching hangout by ID:', error)
//     return null
//   }
// }

// export async function createHangout(hangout: Hangout): Promise<Hangout> {
//   const res = await databases.createDocument(db, hangoutCollection, hangout.hangoutId, hangout)
//   return res as unknown as Hangout
// }

// export async function updateHangout(hangout: Hangout): Promise<Hangout> {
//   const res = await databases.updateDocument(db, hangoutCollection, hangout.hangoutId, hangout)
//   return res as unknown as Hangout
// }

// export async function deleteHangout(id: string): Promise<void> {
//   await databases.deleteDocument(db, hangoutCollection, id)
// }

import { databases, ID, Query } from "./appwrite";
import { db, hangoutCollection } from "@/models/name";
import { getUser } from "./auth";

export async function isCurrentUserOrganizer(hangout: { createdBy: string }) {
  const user = await getUser();
  return user?.$id === hangout.createdBy;
}

export function formatHangoutDateTime(dateTime: string) {
  const date = new Date(dateTime);
  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function createHangout(data: any) {
  return databases.createDocument(db, hangoutCollection, ID.unique(), data);
}

export async function getHangout(id: string) {
  return databases.getDocument(db, hangoutCollection, id);
}

export async function updateHangout(id: string, updates: any) {
  return databases.updateDocument(db, hangoutCollection, id, updates);
}

export async function deleteHangout(id: string) {
  return databases.deleteDocument(db, hangoutCollection, id);
}

export async function listHangouts() {
  const result = await databases.listDocuments(db, hangoutCollection);
  return result.documents;
}

export async function listHangoutsByStatus(
  status: "open" | "confirmed" | "completed"
) {
  const result = await databases.listDocuments(db, hangoutCollection, [
    Query.equal("status", status),
    Query.orderAsc("startDateTime"),
  ]);
  return result.documents;
}

export async function searchHangouts({
  title,
  interest,
  category,
}: {
  title?: string;
  interest?: string;
  category?: string;
}) {
  const queries = [];

  if (title) queries.push(Query.search("title", title));
  if (interest) queries.push(Query.contains("tags", [interest]));
  if (category) queries.push(Query.equal("type", category));

  const result = await databases.listDocuments(db, hangoutCollection, queries);
  return result.documents;
}
