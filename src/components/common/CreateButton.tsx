import React from 'react'
import { PlusIcon } from 'lucide-react'

const CreateButton = () => {
  return (
    <div className="fixed bottom-10 right-10 cursor-pointer">
      <PlusIcon className="w-10 h-10 text-purple-500 rounded-full bg-white hover:bg-gray-600 p-2" />
    </div>
  )
}

export default CreateButton