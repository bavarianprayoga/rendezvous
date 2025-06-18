import { databases, ID, Query } from "./appwrite";
import { db, userCollection } from "@/models/name";
import { getUser } from "./auth";

export async function getMyProfile() {
  const user = await getUser();
  if (!user) return null;
  return databases.getDocument(db, userCollection, user.$id);
}

export async function updateMyProfile(updates: any) {
  const user = await getUser();
  if (!user) throw new Error("Not logged in");
  return databases.updateDocument(db, userCollection, user.$id, updates);
}

export async function getUserById(userId: string) {
  return databases.getDocument(db, userCollection, userId);
}

export async function searchUsersByName(name: string) {
  const result = await databases.listDocuments(db, userCollection, [
    Query.search("username", name),
  ]);
  return result.documents;
}

export async function listUsersByTab(tab: "friends" | "pending" | "discover") {
  const current = await getMyProfile();
  if (!current) return [];

  const currentId = current.$id;
  const friendIds = current.friendIds || [];
  const friendRequests = current.friendRequests || [];

  const allUsers = await databases.listDocuments(db, userCollection, [
    Query.notEqual("$id", currentId),
  ]);

  if (tab === "friends") {
    return allUsers.documents.filter((u) => friendIds.includes(u.$id));
  }

  if (tab === "pending") {
    return allUsers.documents.filter((u) => (u.friendRequests || []).includes(currentId));
  }

  if (tab === "discover") {
    return allUsers.documents.filter(
      (u) =>
        !friendIds.includes(u.$id) &&
        !(u.friendRequests || []).includes(currentId)
    );
  }

  return [];
}

export async function sendFriendRequest(toUserId: string) {
  const current = await getMyProfile();
  if (!current) throw new Error("Not logged in");
  const target = await getUserById(toUserId);

  const updatedRequests = [...(target.friendRequests || []), current.$id];
  return databases.updateDocument(db, userCollection, target.$id, {
    friendRequests: updatedRequests,
  });
}

export async function acceptFriendRequest(fromUserId: string) {
  const current = await getMyProfile();
  if (!current) throw new Error("Not logged in");
  const sender = await getUserById(fromUserId);

  const newFriendList = [...(current.friendIds || []), fromUserId];
  const newSenderFriendList = [...(sender.friendIds || []), current.$id];

  await databases.updateDocument(db, userCollection, current.$id, {
    friendIds: newFriendList,
    friendRequests: (current.friendRequests || []).filter((id: string) => id !== fromUserId),
  });

  await databases.updateDocument(db, userCollection, sender.$id, {
    friendIds: newSenderFriendList,
  });

  return true;
}

export async function declineFriendRequest(fromUserId: string) {
  const current = await getMyProfile();
  if (!current) throw new Error("Not logged in");
  const updatedRequests = (current.friendRequests || []).filter((id: string) => id !== fromUserId);

  return databases.updateDocument(db, userCollection, current.$id, {
    friendRequests: updatedRequests,
  });
}