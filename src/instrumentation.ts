import setupDB from '@/models/server/dbSetup'

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        try {
            console.log('Initializing database...')
            await setupDB()
            console.log('Database initialization completed successfully')
        } catch (error) {
            console.error('Database initialization failed:', error)
            // Don't throw error to prevent app from crashing
        }
    }
} 