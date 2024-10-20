import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CircleCheck, CirclePlus, Heart, MessageCircle, ThumbsDown } from "lucide-react"
import { MouseEvent, MouseEventHandler, useState, useEffect } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SelectGuide } from "./SelectGuide";
import { Guide } from "@prisma/client";
import { useApp } from '@/components/AppContext'
import { useToast } from "@/hooks/use-toast"


export const ReviewCard = (props: { guides: Guide[], ipAssetId: `0x${string}`, title: string, description: string, imageUrl: string, isAdded: boolean, onAdd: (added: boolean) => void }) => {
  const { toast } = useToast()
  const handelDislike: MouseEventHandler<HTMLDivElement> = (e) => { console.log(`Disiked ${props.title}`); e.stopPropagation() }
  const handelLike: MouseEventHandler<HTMLDivElement> = (e) => { console.log(`Liked ${props.title}`); e.stopPropagation() }
  const handelAdd: MouseEventHandler<HTMLDivElement> = (e) => { props.onAdd(!props.isAdded); e.stopPropagation() }

  const handelClick = () => console.log(`Clicked ${props.title}`)
  const [selectedGuide, setSelectedGuide] = useState<`0x${string}` | null>(null)

  console.log("Guides", props.guides)

  const { client } = useApp()

  const handleRegisterDerivative = async (ipAssetId: `0x${string}`, parentIpAssetId: `0x${string}`) => {
    const licenseTermsId = '13'

    const response = await client?.ipAsset.registerDerivative({
      childIpId: ipAssetId,
      parentIpIds: [parentIpAssetId],
      licenseTermsIds: [licenseTermsId],
      txOptions: { waitForTransaction: true }
    });

    console.log(`Derivative IPA linked to parent at transaction hash ${response?.txHash}`)
    toast({
      title: "Derivative IPA linked to parent",
      description: `Derivative Link transaction hash ${response?.txHash}`,
    })
  }

  useEffect(() => {
    console.log("Selected Guide", selectedGuide)

    if (selectedGuide) {
      handleRegisterDerivative(props.ipAssetId, selectedGuide)
    }

  }, [selectedGuide])


  // check file type of imageUrl
  const [fileType, setFileType] = useState<string | null>(null)
  useEffect(() => {
    const checkFileType = async () => {
      const response = await fetch(props.imageUrl)
      const contentType = response.headers.get('content-type')
      setFileType(contentType || null)
    }
    checkFileType();
  }, [props.imageUrl])

  return (
    <Card onClick={handelClick}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <img
          src="https://via.placeholder.com/300"
          alt={props.title}
          className="w-full h-48 object-cover"
        /> */}

        {/* based on file type of imageUrl, if it's image show image preview, if it's video show video preview */}
        {fileType?.includes('image') && (
          <img src={props.imageUrl} alt={props.title} className="w-full h-48 object-contain" />
        )}
        {fileType?.includes('video') && (
          <video src={props.imageUrl} className="w-full h-48 object-contain" autoPlay muted loop playsInline />
        )}


      </CardContent>
      <CardFooter className="flex justify-around p-4">
        <>
          <div onClick={handelDislike} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:scale-105">
            <ThumbsDown className="w-6 h-6 text-gray-700" />
          </div>

          <div onClick={handelLike} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:scale-105">
            <MessageCircle className="w-6 h-6 text-red-500" />
          </div>

          <div onClick={handelLike} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:scale-105">
            <Heart className="w-6 h-6 text-red-500" />
          </div>

          {props.guides ? <SelectGuide guides={props.guides} onSelect={setSelectedGuide} /> : null}

        </>
      </CardFooter>
    </Card>
  )
}