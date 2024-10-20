'use client'

import React, { useState } from 'react'
import { BookMarked } from 'lucide-react'
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
import axios from 'axios'

const CreateButton = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [license, setLicense] = useState<PIL_TYPE>(PIL_TYPE.COMMERCIAL_USE)
  const { data: wallet } = useWalletClient()

  const { createNFTCollection } = useNftClient();
  const { register } = useIpAsset();

  const { client } = useApp()

  const handleCreateReview = async () => {
    try {
      if (!client) return

      setIsCreating(true)

      // if image is present, upload to ipfs
      console.log(image)
      let ipfsUrl = ''
      if (image) {
        const ipfsHash = await uploadImageToIPFS(image)
        ipfsUrl = getIPFSUrl(ipfsHash)
        console.log(ipfsUrl)
      }

      // generate ip metadata
      const ipMetadata = await generateIpMetadata(client, ipfsUrl, title, description)
      console.log('ipMetadata', ipMetadata)

      const registeredIpAsset =
        await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
          nftContract: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
          pilType: license,
          mintingFee: 0,
          currency: '0x91f6F05B08c16769d3c85867548615d270C42fC7',
          commercialRevShare: 0,
          ipMetadata,
          txOptions: { waitForTransaction: true },
        });
      console.log(
        `Root IPA created at transaction hash ${registeredIpAsset.txHash}, IPA ID: ${registeredIpAsset.ipId}`
      );

      const response = await axios.post('/api/add-guide', {
        ipAssetId: registeredIpAsset.ipId,
        title,
        description,
        ipfsUrl
      })

      setIsCreating(false)
    } catch (error) {
      console.error(error)
    } finally {
      setTitle('')
      setDescription('')
      setImage(null)
      setIsCreating(false)
    }
  }

  return (<>
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed bottom-10 right-10">
          <div className="relative cursor-pointer z-10 hover:z-50">
            <BookMarked className="w-10 h-10 text-red-500 rounded-full bg-white hover:bg-gray-600 p-2" />
          </div>
        </div>

      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Design a Guide</DialogTitle>
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
        {image?.type.includes('image') && (
          <div className="flex flex-col">
            <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-48 object-contain" />
          </div>
        )}

        {/* check if image file is a video, if so, preview video */}
        {image?.type.includes('video') && (
          <div className="flex flex-col">
            <video src={URL.createObjectURL(image)} className="w-full h-48 object-contain" autoPlay muted loop playsInline />
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