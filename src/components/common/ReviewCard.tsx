import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CircleCheck, CirclePlus, Heart, MessageCircle, ThumbsDown } from "lucide-react"
import { MouseEvent, MouseEventHandler } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SelectGuide } from "./SelectGuide";
import { Guide } from "@prisma/client";


export const ReviewCard = (props: {guides: Guide[], title: string, description: string, imageUrl: string, isAdded: boolean, onAdd: (added: boolean) => void}) => {
  const handelDislike: MouseEventHandler<HTMLDivElement>  = (e) => {console.log(`Disiked ${props.title}`); e.stopPropagation()}
  const handelLike: MouseEventHandler<HTMLDivElement> = (e) => {console.log(`Liked ${props.title}`); e.stopPropagation()}
  const handelAdd: MouseEventHandler<HTMLDivElement> = (e) => {props.onAdd(!props.isAdded); e.stopPropagation()}

  const handelClick = () => console.log(`Clicked ${props.title}`)
  return (
  <Card onClick={handelClick}>
    <CardHeader>
      <CardTitle>{props.title}</CardTitle>
      <CardDescription>{props.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <img
        src="https://via.placeholder.com/300"
        alt={props.title}
        className="w-full h-48 object-cover"
      />
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
        
          <SelectGuide guides={props.guides}/>
        
      </>
      </CardFooter>
    </Card>
  )
}