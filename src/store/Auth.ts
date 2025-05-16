import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"

import { AppwriteException, ID, Models } from "appwrite"
import { account } from "@/models/client/config"

export interface UserPrefs {
    name: string;
    email: string;
    username: string;
}

interface IAuthStore {
    session: Models.Session | null;
    jwt: string | null;
    user: Models.User<UserPrefs> | null;
    hydrate: boolean;

    setHydrated(): void
    verifySession(): Promise<void>
    login(
        email: string,
        password: string
    ): Promise<
    {
        success: boolean;
        error?: AppwriteException | null;
    }>
    signup(
        name: string,
        email: string,
        password: string,
        username: string
    ): Promise<
    {
        success: boolean;
        error?: AppwriteException | null;
    }>
    logout(): Promise<void>
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set) => ({
            session: null,
            jwt: null,
            user: null,
            hydrate: false,

            setHydrated() {
                set({hydrate: true})
            },

            async verifySession() {
                try {
                    const session = await account.getSession("current")
                    set({session})
                } catch (error) {
                    console.error(error)
                }
            },

            async login(email: string, password: string) {
                try {
                    const session = await account.createEmailPasswordSession(email, password)
                    const [user, {jwt}] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT()
                    ])
                    set({session, jwt, user})
                    return {success: true}
                } catch (error) {
                    console.error(error)
                    return {success: false, error: error as AppwriteException | null}
                }
            },

            async signup(name: string, email: string, password: string, username: string) {
                try {
                    await account.create(ID.unique(), email, password, username)
                    return {success: true}
                } catch (error) {
                    console.error(error)
                    return {success: false, error: error as AppwriteException | null}
                }
            },

            async logout() {
                try {
                    await account.deleteSessions()
                    set({session: null, jwt: null, user: null})
                } catch (error) {
                    console.error(error)
                }
            },
                
        })),
        {
            name: "auth",
            onRehydrateStorage(){
                return (state, error) => {
                    if (!error) state?.setHydrated()
                }
            }
        }
    )
)
