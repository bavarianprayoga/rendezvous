import { create} from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"

import { ID } from "appwrite"
import { databases } from "@/models/client/config"
import { db, hangoutCollection } from "@/models/name"

export interface Hangout {
    hangoutId: string;
    name: string;
    description: string;
    hangoutDate: Date;
    venueId: string;
    creator: string;
    participants: string[];
    groupSize: number;
    hangoutStatus: "pending" | "confirmed" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

interface IHangoutStore {
    currentHangout: Hangout | null;
    hangouts: Hangout[];
    hydrate: boolean;
    loading: boolean;
    error: string | null;

    setHydrated(): void;
    // actions
    fetchHangouts(): Promise<void>;
    fetchHangoutById(hangoutId: string): Promise<void>;
    createHangout(hangout: Omit<Hangout, "hangoutId" | "createdAt" | "updatedAt">): Promise<{
        success: boolean;
        error?: Error | null;
    }>;
    updateHangout(hangout: Partial<Hangout> & { hangoutId: string }): Promise<{
        success: boolean;
        error?: Error | null;
    }>;
    deleteHangout(hangoutId: string): Promise<{
        success: boolean;
        error?: Error | null;
    }>;
}

export const useHangoutStore = create<IHangoutStore>()(
    persist(
        immer((set, get) => ({
            currentHangout: null,
            hangouts: [],
            hydrate: false,
            loading: false,
            error: null,
            
            setHydrated() {
                set({hydrate: true})
            },
            
            async fetchHangouts() {
                set({loading: true, error: null});
                try {
                    const response = await databases.listDocuments(
                        db,
                        hangoutCollection
                    );
                    
                    const hangouts = response.documents.map(doc => ({
                        hangoutId: doc.hangoutId || doc.$id,
                        name: doc.name,
                        description: doc.description,
                        hangoutDate: new Date(doc.hangoutDate),
                        venueId: doc.venueId,
                        creator: doc.creatorId,
                        participants: doc.joinedUserIds ? doc.joinedUserIds.split(',') : [],
                        groupSize: doc.groupSize,
                        hangoutStatus: doc.hangoutStatus,
                        createdAt: doc.$createdAt,
                        updatedAt: doc.$updatedAt
                    })) as Hangout[];
                    
                    set({hangouts, loading: false});
                } catch (error) {
                    set({error: (error as Error).message, loading: false});
                }
            },
            
            async fetchHangoutById(hangoutId) {
                set({loading: true, error: null});
                try {
                    const doc = await databases.getDocument(
                        db,
                        hangoutCollection,
                        hangoutId
                    );
                    
                    const hangout: Hangout = {
                        hangoutId: doc.hangoutId || doc.$id,
                        name: doc.name,
                        description: doc.description,
                        hangoutDate: new Date(doc.hangoutDate),
                        venueId: doc.venueId,
                        creator: doc.creatorId,
                        participants: doc.joinedUserIds ? doc.joinedUserIds.split(',') : [],
                        groupSize: doc.groupSize,
                        hangoutStatus: doc.hangoutStatus,
                        createdAt: doc.$createdAt,
                        updatedAt: doc.$updatedAt
                    };
                    
                    set({currentHangout: hangout, loading: false});
                } catch (error) {
                    set({error: (error as Error).message, loading: false});
                }
            },
            
            async createHangout(hangoutData) {
                set({loading: true, error: null});
                try {
                    const now = new Date().toISOString();
                    const hangoutId = ID.unique();
                    
                    // Convert participants array to joined user IDs string
                    const joinedUserIds = hangoutData.participants ? 
                        hangoutData.participants.join(',') : 
                        '';
                    
                    await databases.createDocument(
                        db,
                        hangoutCollection,
                        hangoutId,
                        {
                            hangoutId,
                            name: hangoutData.name,
                            description: hangoutData.description,
                            hangoutDate: hangoutData.hangoutDate.toISOString(),
                            venueId: hangoutData.venueId,
                            creatorId: hangoutData.creator,
                            joinedUserIds,
                            groupSize: hangoutData.groupSize,
                            hangoutStatus: hangoutData.hangoutStatus,
                            createdAt: now,
                            updatedAt: now
                        }
                    );
                    
                    // Refresh hangouts list
                    await get().fetchHangouts();
                    
                    set({loading: false});
                    return {success: true};
                } catch (error) {
                    set({error: (error as Error).message, loading: false});
                    return {success: false, error: error as Error};
                }
            },
            
            async updateHangout(hangoutData) {
                set({loading: true, error: null});
                try {
                    const { hangoutId, ...data } = hangoutData;
                    const updateData: Record<string, string | number | boolean> = {};
                    
                    // Only include fields that are present
                    if (data.name) updateData.name = data.name;
                    if (data.description !== undefined) updateData.description = data.description;
                    if (data.hangoutDate) updateData.hangoutDate = data.hangoutDate instanceof Date ? 
                        data.hangoutDate.toISOString() : data.hangoutDate;
                    if (data.venueId) updateData.venueId = data.venueId;
                    if (data.creator) updateData.creatorId = data.creator;
                    if (data.participants) updateData.joinedUserIds = data.participants.join(',');
                    if (data.groupSize) updateData.groupSize = data.groupSize;
                    if (data.hangoutStatus) updateData.hangoutStatus = data.hangoutStatus;
                    
                    updateData.updatedAt = new Date().toISOString();
                    
                    await databases.updateDocument(
                        db,
                        hangoutCollection,
                        hangoutId,
                        updateData
                    );
                    
                    // Refresh current hangout if it's the one being updated
                    if (get().currentHangout?.hangoutId === hangoutId) {
                        await get().fetchHangoutById(hangoutId);
                    }
                    
                    // Refresh hangouts list
                    await get().fetchHangouts();
                    
                    set({loading: false});
                    return {success: true};
                } catch (error) {
                    set({error: (error as Error).message, loading: false});
                    return {success: false, error: error as Error};
                }
            },
            
            async deleteHangout(hangoutId) {
                set({loading: true, error: null});
                try {
                    await databases.deleteDocument(
                        db,
                        hangoutCollection,
                        hangoutId
                    );
                    
                    // Clear current hangout if it's the one being deleted
                    if (get().currentHangout?.hangoutId === hangoutId) {
                        set({currentHangout: null});
                    }
                    
                    // Update hangouts list
                    set(state => {
                        state.hangouts = state.hangouts.filter(h => h.hangoutId !== hangoutId);
                    });
                    
                    set({loading: false});
                    return {success: true};
                } catch (error) {
                    set({error: (error as Error).message, loading: false});
                    return {success: false, error: error as Error};
                }
            }
        })),
        {
            name: "hangout-store",
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error) state?.setHydrated();
                };
            }
        }
    )
);
