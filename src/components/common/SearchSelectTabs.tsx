
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const SearchSelectTabs = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) => {
  return (
    <Tabs defaultValue={activeTab} className="w-[400px]" onValueChange={onTabChange}>
    <TabsList>
      <TabsTrigger value="foodanddrink">Food & Drink</TabsTrigger>
      <TabsTrigger value="thingstodo">Things to do</TabsTrigger>
      <TabsTrigger value="placestostay">Places to stay</TabsTrigger>
    </TabsList>
    </Tabs>
  )
}