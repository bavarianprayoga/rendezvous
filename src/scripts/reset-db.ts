import { databases } from '@/models/server/config'
import { db } from '@/models/name'
import setupDB from '@/models/server/dbSetup'

async function resetDatabase() {
  try {
    console.log('🗑️  Deleting existing database...')
    await databases.delete(db)
    console.log('✅ Database deleted successfully')
    
    console.log('🔄 Setting up database with new schema...')
    await setupDB()
    console.log('✅ Database setup complete!')
    
  } catch (error) {
    console.error('❌ Error resetting database:', error)
  }
}

resetDatabase() 