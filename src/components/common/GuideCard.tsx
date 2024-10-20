import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type GuideCardProps = {
  title: string
  description: string
  imageUrl: string
  isAdded: boolean
}

const GuideCard = ({ title, description, imageUrl, isAdded }: GuideCardProps) => {
  const [fileType, setFileType] = useState<string | null>(null)
  useEffect(() => {
    const checkFileType = async () => {
      const response = await fetch(imageUrl)
      const contentType = response.headers.get('content-type')
      setFileType(contentType || null)
    }
    checkFileType();
  }, [imageUrl])

  return (
    <div className={cn(
      "rounded-md shadow-lg overflow-hidden w-[200px] h-[300px]",
      "shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px]",
      "flex flex-col"
    )}>
      {/* based on file type of imageUrl, if it's image show image preview, if it's video show video preview */}
      {fileType?.includes('image') && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-contain" />
      )}
      {fileType?.includes('video') && (
        <video src={imageUrl} className="w-full h-48 object-contain" autoPlay muted loop playsInline />
      )}
    </div>
  )
}

export default GuideCard