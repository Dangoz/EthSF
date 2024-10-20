import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, ThumbsDown } from "lucide-react"
import { MouseEvent, MouseEventHandler } from "react";


export const ReviewCard = (props: {title: string, description: string, imageUrl: string}) => {
  const handelDislike: MouseEventHandler<HTMLDivElement>  = (e) => {console.log(`Disiked ${props.title}`); e.stopPropagation()}
  const handelLike: MouseEventHandler<HTMLDivElement> = (e) => {console.log(`Liked ${props.title}`); e.stopPropagation()}
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
          <Heart className="w-6 h-6 text-red-500" />
        </div>
        {/*
        <div onClick={handelDislike} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:scale-105">
          <Add className="w-6 h-6 text-gray-700" />
        </div>
        */}

      </>
      </CardFooter>
    </Card>
  )
}