import { Client, Account, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export async function register(name: string, email: string, password: string) {
  try {
    await account.create(ID.unique(), email, password, name);
    await account.createSession(email, password);
    const user = await account.get();
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error };
  }
}

export async function login(email: string, password: string) {
  try {
    await account.createSession(email, password);
    const user = await account.get();
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error };
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return { success: true };
  } catch (error: any) {
    return { success: false, error };
  }
}

export async function getUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}
