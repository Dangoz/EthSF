import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, ThumbsDown } from "lucide-react"


export const Wrapper = (props: {children: React.ReactNode}) => <div className="flex flex-col gap-5 p-5 ">
  {props.children}
</div>