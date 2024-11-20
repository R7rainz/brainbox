import { Link2Icon, MoreVertical, PenBox, Trash2 } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

  
function DocumentOptions({doc,deleteDocument}) {
  return (
    <div>
       
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical classname = 'h-4 w-4'></MoreVertical>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem classname="flex gap-2"> <Link2Icon classname='h-4 w-4'></Link2Icon> Share Link</DropdownMenuItem>
            <DropdownMenuItem classname="flex gap-2"> <PenBox classname='h-4 w-4'></PenBox> Rename</DropdownMenuItem>
            <DropdownMenuItem classname="flex gap-2 text-red-500"> <Trash2 classname='h-4 w-4'></Trash2> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


    </div>
  )
}

export default DocumentOptions