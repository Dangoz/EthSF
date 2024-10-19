"use client";

import { ReviewCard } from '@/components/common/ReviewCard';
import { SearchSelectTabs } from '@/components/common/SearchSelectTabs';
import { Title } from '@/components/common/Title';
import { Wrapper } from '@/components/common/Wrapper';
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"


const locationReviewData: { title: string; description: string; imageUrl: string }[] = [
  {
    title: "1st West Food Truck",
    description: "A popular taco truck serving authentic street tacos with a variety of toppings.",
    imageUrl: "https://via.placeholder.com/300x200?text=1st+West+Food+Truck",
  },
  {
    title: "Upper North Coffee Stand",
    description: "A cozy coffee stand offering espresso, lattes, and cold brews with a great view of the park.",
    imageUrl: "https://via.placeholder.com/300x200?text=Upper+North+Coffee+Stand",
  },
  {
    title: "5th East Workshop",
    description: "A woodworking workshop where local artisans create and display handcrafted furniture.",
    imageUrl: "https://via.placeholder.com/300x200?text=5th+East+Workshop",
  },
  {
    title: "Lower South Benches",
    description: "A quiet seating area with comfortable benches near the water fountain.",
    imageUrl: "https://via.placeholder.com/300x200?text=Lower+South+Benches",
  },
  {
    title: "3rd Floor Tables",
    description: "A series of long communal tables, perfect for group dining or working in an open space.",
    imageUrl: "https://via.placeholder.com/300x200?text=3rd+Floor+Tables",
  },
  {
    title: "2nd West Food Truck",
    description: "A truck serving gourmet burgers with locally sourced ingredients and craft sodas.",
    imageUrl: "https://via.placeholder.com/300x200?text=2nd+West+Food+Truck",
  },
  {
    title: "Upper East Coffee Stand",
    description: "An artisanal coffee stand known for its signature cold brew and house-made pastries.",
    imageUrl: "https://via.placeholder.com/300x200?text=Upper+East+Coffee+Stand",
  },
  {
    title: "4th West Workshop",
    description: "An electronics workshop offering hands-on courses for building DIY gadgets.",
    imageUrl: "https://via.placeholder.com/300x200?text=4th+West+Workshop",
  },
  {
    title: "Lower North Benches",
    description: "Shaded benches perfect for a relaxing break under the trees.",
    imageUrl: "https://via.placeholder.com/300x200?text=Lower+North+Benches",
  },
  {
    title: "5th Floor Tables",
    description: "Private tables in an elevated section, offering a view of the entire market.",
    imageUrl: "https://via.placeholder.com/300x200?text=5th+Floor+Tables",
  },
  {
    title: "3rd South Food Truck",
    description: "A food truck known for its spicy fried chicken sandwiches and loaded fries.",
    imageUrl: "https://via.placeholder.com/300x200?text=3rd+South+Food+Truck",
  },
  {
    title: "Upper West Coffee Stand",
    description: "A stylish coffee kiosk offering seasonal beverages and a variety of teas.",
    imageUrl: "https://via.placeholder.com/300x200?text=Upper+West+Coffee+Stand",
  },
  {
    title: "1st North Workshop",
    description: "A metalworking workshop where you can create custom jewelry or sculptures.",
    imageUrl: "https://via.placeholder.com/300x200?text=1st+North+Workshop",
  },
  {
    title: "Lower West Benches",
    description: "Rustic wooden benches near the artisan market, perfect for people-watching.",
    imageUrl: "https://via.placeholder.com/300x200?text=Lower+West+Benches",
  },
  {
    title: "4th Floor Tables",
    description: "Modern dining tables in a shared indoor space, ideal for lunch breaks.",
    imageUrl: "https://via.placeholder.com/300x200?text=4th+Floor+Tables",
  },
  {
    title: "2nd East Food Truck",
    description: "A truck serving vegan wraps and smoothies, with fresh and healthy options.",
    imageUrl: "https://via.placeholder.com/300x200?text=2nd+East+Food+Truck",
  },
  {
    title: "Upper South Coffee Stand",
    description: "A trendy coffee stand offering artisanal brews and specialty lattes.",
    imageUrl: "https://via.placeholder.com/300x200?text=Upper+South+Coffee+Stand",
  },
  {
    title: "3rd North Workshop",
    description: "A tech-focused workshop providing 3D printing and virtual reality experiences.",
    imageUrl: "https://via.placeholder.com/300x200?text=3rd+North+Workshop",
  },
  {
    title: "Lower East Benches",
    description: "Benches near the water garden, a calm spot to relax after shopping.",
    imageUrl: "https://via.placeholder.com/300x200?text=Lower+East+Benches",
  },
  {
    title: "1st Floor Tables",
    description: "Outdoor tables in a bustling area of the market, great for a quick snack.",
    imageUrl: "https://via.placeholder.com/300x200?text=1st+Floor+Tables",
  },
  {
    title: "4th South Food Truck",
    description: "A food truck offering gourmet grilled cheese sandwiches with unique twists.",
    imageUrl: "https://via.placeholder.com/300x200?text=4th+South+Food+Truck",
  },
  {
    title: "Lower North Coffee Stand",
    description: "A small stand with grab-and-go coffee options for busy shoppers.",
    imageUrl: "https://via.placeholder.com/300x200?text=Lower+North+Coffee+Stand",
  },
  {
    title: "5th North Workshop",
    description: "A pottery workshop where visitors can mold and fire their own creations.",
    imageUrl: "https://via.placeholder.com/300x200?text=5th+North+Workshop",
  },
  {
    title: "Upper West Benches",
    description: "Benches placed on a scenic overlook, offering stunning views of the city skyline.",
    imageUrl: "https://via.placeholder.com/300x200?text=Upper+West+Benches",
  },
  {
    title: "2nd Floor Tables",
    description: "Private tables inside a glass atrium, offering a serene dining environment.",
    imageUrl: "https://via.placeholder.com/300x200?text=2nd+Floor+Tables",
  },
  {
    title: "1st East Food Truck",
    description: "A street food truck serving authentic Indian curries and naan.",
    imageUrl: "https://via.placeholder.com/300x200?text=1st+East+Food+Truck",
  },
  {
    title: "Upper East Coffee Stand",
    description: "A coffee stand offering organic blends and farm-to-cup brews.",
    imageUrl: "https://via.placeholder.com/300x200?text=Upper+East+Coffee+Stand",
  },
  {
    title: "3rd South Workshop",
    description: "A fashion workshop where you can design and sew your own clothing.",
    imageUrl: "https://via.placeholder.com/300x200?text=3rd+South+Workshop",
  },
  {
    title: "Lower South Benches",
    description: "Seating next to a community garden, perfect for relaxing after a workshop.",
    imageUrl: "https://via.placeholder.com/300x200?text=Lower+South+Benches",
  },
  {
    title: "5th Floor Tables",
    description: "Elegant tables with a rooftop view, perfect for evening dining.",
    imageUrl: "https://via.placeholder.com/300x200?text=5th+Floor+Tables",
  },
];


const page = () => {
  const [searchSelect, onChangeSearchSelect] = useState("foodanddrink")
  const [searchText, onChangeSearchText] = useState('')

  return (
    <Wrapper>
    <Title name="Discover"/>
    <Input type="text" placeholder="Search" value={searchText} onChange={(e) => onChangeSearchText(e.target.value)}/>
    <SearchSelectTabs activeTab={searchSelect} onTabChange={onChangeSearchSelect}/>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {
        locationReviewData.map((card, index) => <ReviewCard key={index}  {...card}/>)
      }
    </div>
    
    </Wrapper>
  )
}

export default page