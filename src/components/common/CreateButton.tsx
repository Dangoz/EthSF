'use client'

import React, { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Loader } from "lucide-react"
import { uploadImageToIPFS, uploadJSONToIPFS, getIPFSUrl } from '@/lib/pinata'

const CreateButton = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateReview = async () => {
    setIsCreating(true)

    // if image is present, upload to ipfs
    console.log(image)
    let imageIpfsHash = null
    if (image) {
      const cid = await uploadImageToIPFS(image)
      imageIpfsHash = getIPFSUrl(cid)
    }

    setIsCreating(false)
  }

  return (<>

    <Dialog>

      <DialogTrigger asChild>
        <div className="fixed bottom-10 right-10 cursor-pointer">
          <PlusIcon className="w-10 h-10 text-purple-500 rounded-full bg-white hover:bg-gray-600 p-2" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write Review</DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>


        {/* title */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="title" className="text-sm font-medium">Title</Label>
          <Input id="title" onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Textarea id="description" onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* media - image */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="image" className="text-sm font-medium">Image</Label>
          <Input id="image" type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </div>

        {/* when image is present, preview image */}
        {image && (
          <div className="flex flex-col">
            <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-48 object-contain" />
          </div>
        )}

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleCreateReview} disabled={isCreating || !title || !description}>
            {isCreating ? <Loader className="w-4 h-4 animate-spin" /> : 'Create Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  )
}

export default CreateButton