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
import { useIpAsset, useNftClient, PIL_TYPE } from "@story-protocol/react-sdk";
import { useWalletClient } from 'wagmi'
import { Address } from 'viem'
import { generateIpMetadata } from '@/lib/story/generateIpMetadata'
import { useApp } from '@/components/AppContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"

const CreateButton = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [license, setLicense] = useState<PIL_TYPE>(PIL_TYPE.NON_COMMERCIAL_REMIX)
  const { data: wallet } = useWalletClient()

  const { createNFTCollection } = useNftClient();
  const { register } = useIpAsset();

  const { client } = useApp()

  const handleCreateReview = async () => {
    if (!client) return

    setIsCreating(true)

    // if image is present, upload to ipfs
    console.log(image)
    let ipfsUrl = ''
    if (image) {
      const cid = await uploadImageToIPFS(image)
      ipfsUrl = getIPFSUrl(cid)
      console.log(ipfsUrl)
    }

    // generate ip metadata
    const ipMetadata = await generateIpMetadata(client, ipfsUrl, title, description)
    console.log('ipMetadata', ipMetadata)

    const registeredIpAsset =
      await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
        nftContract: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        pilType: license,
        ipMetadata,
        txOptions: { waitForTransaction: true },
      });
    console.log(
      `Root IPA created at transaction hash ${registeredIpAsset.txHash}, IPA ID: ${registeredIpAsset.ipId}`
    );

    setIsCreating(false)
  }

  return (<>

    <Dialog>

      <DialogTrigger asChild>
        <div className="fixed bottom-10 right-10 cursor-pointer">
          <PlusIcon className="w-10 h-10 text-red-500 rounded-full bg-white hover:bg-gray-600 p-2" />
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

        {/* License */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="license" className="text-sm font-medium">License</Label>
          <Select onValueChange={(value) => setLicense(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a License" />
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </SelectTrigger>
          </Select>
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