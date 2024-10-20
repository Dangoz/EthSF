import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type GuideCardProps = {
  title: string
  description: string
  imageUrl: string
  isAdded: boolean
}

const GuideCard = ({ title, description, imageUrl, isAdded }: GuideCardProps) => {
  return (
    <div className={cn(
      "rounded-md shadow-lg overflow-hidden w-[200px] h-[300px]",
      "shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px]",
      "flex flex-col"
    )}>
      <Image src={imageUrl} alt={title} width={100} height={80} className="w-full object-cover z-0" />
    </div>
  )
}

export default GuideCard