import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getImageUrl, getDirectImageUrl } from '@/lib/venues'

export default function ImageTester() {
  const [fileId, setFileId] = useState('')
  const [urls, setUrls] = useState<{
    direct: string
    preview: string
  }>({ direct: '', preview: '' })

  const testUrls = () => {
    const directUrl = getDirectImageUrl(fileId)
    const previewUrl = getImageUrl(fileId)
    
    setUrls({
      direct: directUrl,
      preview: previewUrl
    })
    
    console.log('Direct URL:', directUrl)
    console.log('Preview URL:', previewUrl)
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Image URL Tester</h3>
      
      <div className="flex gap-2">
        <Input
          placeholder="Enter file ID from Appwrite console"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
        />
        <Button onClick={testUrls}>Test URLs</Button>
      </div>

      {urls.direct && (
        <div className="space-y-2">
          <p><strong>Direct URL:</strong> {urls.direct}</p>
          <img src={urls.direct} alt="Direct URL test" className="max-w-xs" onError={(e) => console.log('Direct URL failed to load')} />
        </div>
      )}

      {urls.preview && (
        <div className="space-y-2">
          <p><strong>Preview URL:</strong> {urls.preview}</p>
          <img src={urls.preview} alt="Preview URL test" className="max-w-xs" onError={(e) => console.log('Preview URL failed to load')} />
        </div>
      )}
    </div>
  )
} 