'use client'

import Image from "next/image";
import Test from "@/components/story/Test";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
// import { ReviewCard } from "@/components/common/ReviewCard";
import { useState, useEffect } from "react"
import type { Guide } from "@prisma/client"
import GuideCard from "@/components/common/GuideCard";

const Hero = () =>

  <div className="flex flex-col items-center justify-center gap-8 p-16 md:p-24 lg:p-36 text-center">
    <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight text-white lg:text-6xl">
      Guides for your next trip
    </h1>
    <p className="max-w-2xl text-lg leading-relaxed text-white lg:text-xl">
      Create a guide for your next trip, curate and share with your friends.
      <br />
      Discover new places, savor unique flavors, and connect with fellow travelers.
    </p>
  </div>

export default function Home() {
  const [guides, setGuides] = useState<Guide[]>([])

  useEffect(() => {
    axios.get("/api/get-guide").then((res) => setGuides(res.data))
  }, [])

  return (
    <div className="">

      <Hero />

      <div className="flex gap-10 overflow-scroll p-4">
        {guides.map((guide) => <GuideCard key={guide.ipAssetId} title={guide.title} description={guide.description ?? ""} imageUrl={guide.ipfsUrl ?? ""} isAdded={false} />)}
      </div>

    </div>
  );
}
