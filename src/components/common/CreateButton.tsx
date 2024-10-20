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
import { Textarea } from "@/components/ui/textarea"
import { Loader } from "lucide-react"
import { uploadImageToIPFS, uploadJSONToIPFS, getIPFSUrl } from '@/lib/pinata'
import { PIL_TYPE } from "@story-protocol/react-sdk";
import { useWalletClient } from 'wagmi'
import { Address } from 'viem'
import { generateIpMetadata } from '@/lib/story/generateIpMetadata'
import { useApp } from '@/components/AppContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"
import axios from "axios";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

const CreateButton = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [license, setLicense] = useState<PIL_TYPE>(PIL_TYPE.NON_COMMERCIAL_REMIX)
  const { data: wallet } = useWalletClient()

  const { toast } = useToast()

  const { client } = useApp()

  // const handleRegisterDerivative = async (ipAssetId: `0x${string}`) => {
  //   const parentIpAssetId = '0x6396Db796b273294cBFF66321559Cf918961A69E'
  //   const licenseTermsId = '13'

  //   const response = await client?.ipAsset.registerDerivative({
  //     childIpId: ipAssetId,
  //     parentIpIds: [parentIpAssetId],
  //     licenseTermsIds: [licenseTermsId],
  //     txOptions: { waitForTransaction: true }
  //   });

  //   console.log(`Derivative IPA linked to parent at transaction hash ${response?.txHash}`)
  // }

  const handleCreateGuide = async () => {
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
        `Root IPA created at transaction hash ${registeredIpAsset.txHash}, IPA ID: ${registeredIpAsset.ipId}, License Terms ID: ${registeredIpAsset.licenseTermsId}`
      );
      toast({
        title: 'Review Created',
        description: `Transaction hash: ${registeredIpAsset.txHash}, IPA ID: ${registeredIpAsset.ipId}`,
        action: (
          <ToastAction
            onClick={() => {
              navigator.clipboard.writeText(`${registeredIpAsset.ipId}`)
            }}
            altText="Goto schedule to undo"
          >
            Copy IPA
          </ToastAction>
        )
      })

      // record the review
      const res = await axios.post('/api/add-review', {
        title,
        description,
        license,
        ipfsUrl,
        ipAssetId: registeredIpAsset.ipId
      })

      if (registeredIpAsset.ipId) {
        // await handleRegisterDerivative(registeredIpAsset.ipId)
      }

    } catch (error) {
      console.error(error)
    } finally {
      setTitle('')
      setDescription('')
      setImage(null)
      setIsCreating(false)
    }
  }

  const sendToDatabase = async () => {
    axios.post("/add-review", {
      title,
      description,
      image,
      license,
    })
  }

  return (<>

    <Dialog>

      <DialogTrigger asChild>
        <div className="fixed bottom-28 right-10 cursor-pointer">
          <PlusIcon className="w-10 h-10 text-red-500 rounded-full bg-white hover:bg-gray-600 p-2" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write Reviews</DialogTitle>
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
          <Select
            onValueChange={(value) => setLicense(value === 'non-commercial-remix' ? PIL_TYPE.NON_COMMERCIAL_REMIX : value === 'commercial-remix' ? PIL_TYPE.COMMERCIAL_REMIX : PIL_TYPE.COMMERCIAL_USE)}
            defaultValue={'non-commercial-remix'}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a License" />
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'non-commercial-remix'}>Non-Commercial Remix</SelectItem>
                  <SelectItem value={'commercial-remix'}>Commercial Remix</SelectItem>
                  <SelectItem value={'commercial-use'}>Commercial Use</SelectItem>
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
          <Button onClick={handleCreateGuide} disabled={isCreating || !title || !description}>
            {isCreating ? <Loader className="w-4 h-4 animate-spin" /> : 'Select Reviews'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  )
}

export default CreateButton