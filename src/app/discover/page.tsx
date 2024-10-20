"use client";

import { ReviewCard } from '@/components/common/ReviewCard';
import { SearchSelectTabs } from '@/components/common/SearchSelectTabs';
import { Title } from '@/components/common/Title';
import { Wrapper } from '@/components/common/Wrapper';
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { dummyLocationReviewData } from './dummyLocationReviewData';
import axios from 'axios';
import { Guide } from '@prisma/client';


const Hero = () => (
  <div
    className="flex flex-col items-center justify-center gap-8 pb-4 md:pb-8 lg:pb-16 p-16 md:p-24 lg:p-36 bg-gradient-to-r from-blue-50 to-white text-center relative"
    style={{
      backgroundImage: "url('/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.9, // Adjust this for lightening
    }}
  >
    <div className="absolute inset-0 bg-white opacity-60"></div> {/* Overlay to lighten */}
    <h1 className="relative scroll-m-20 text-5xl font-extrabold tracking-tight text-black lg:text-6xl">
      Share Your Experiences
    </h1>
    <p className="relative max-w-2xl text-lg leading-relaxed text-black lg:text-xl">
      Discover new places, savor unique flavors, and connect with fellow travelers. Share your honest reviews of food spots, hidden gems, and must-visit locations. Join our community and turn your adventures into inspiration for others!
    </p>
    <button className="relative mt-8 px-6 py-3 text-lg font-semibold text-white bg-[#a797d5] rounded-lg shadow-lg hover:bg-blue-700">
      Get Started
    </button>
  </div>
);


type Review = {
  ipAssetId: `0x${string}`;
  title: string;
  description: string;
  license: string;
  ipfsUrl: string | null;
  guideId: string;
}

const page = () => {
  const [searchSelect, onChangeSearchSelect] = useState("foodanddrink")
  const [searchText, onChangeSearchText] = useState('')

  const [allReviews, setAllReviews] = useState<Review[]>([])
  const [shownReviews, setShownReviews] = useState<Review[]>([])

  const [selectedReviews, setSelectedReviews] = useState<string[]>([])

  useEffect(() => {
    axios.get("/api/get-guide").then((res) => setGuides(res.data))
    axios.get("/api/get-reviews").then((res) => setAllReviews(res.data))
  }, [])


  useEffect(() => {
    setShownReviews(allReviews.filter(card => searchText === '' ? true : card.title.includes(searchText) || card.description.includes(searchText)))
  }, [searchText, allReviews])

  const [guides, setGuides] = useState<Guide[]>([])

  return (

    <>

      <Hero />

      <Wrapper>
        <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-[#a797d5]">Discover</h2>
        <Input type="text" placeholder="Search" value={searchText} onChange={(e) => onChangeSearchText(e.target.value)} />
        <SearchSelectTabs activeTab={searchSelect} onTabChange={onChangeSearchSelect} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            shownReviews.map((card, index) => <ReviewCard guides={guides} key={index}  {...card} imageUrl={card.ipfsUrl ?? ""} isAdded={allReviews.map(review => review.ipAssetId).includes(card.ipAssetId)} onAdd={(added: boolean) => setSelectedReviews([...selectedReviews, card.ipAssetId])} ipAssetId={card.ipAssetId} />)
          }
        </div>

      </Wrapper>
    </>
  )
}

export default page