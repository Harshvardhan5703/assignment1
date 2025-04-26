"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GripVertical, X } from "lucide-react"
import { Calendar, FileText, User } from "lucide-react"

interface SortCriterion {
  field: string
  order: "asc" | "desc"
}

interface SortPanelProps {
  sortCriteria: SortCriterion[]
  setSortCriteria: (criteria: SortCriterion[]) => void
  onClose: () => void
}

export function SortPanel({ sortCriteria, setSortCriteria, onClose }: SortPanelProps) {
  const [localSortCriteria, setLocalSortCriteria] = useState<SortCriterion[]>(sortCriteria)

  const toggleOrder = (index: number) => {
    const newCriteria = [...localSortCriteria]
    newCriteria[index].order = newCriteria[index].order === "asc" ? "desc" : "asc"
    setLocalSortCriteria(newCriteria)
  }

  const removeCriterion = (index: number) => {
    const newCriteria = [...localSortCriteria]
    newCriteria.splice(index, 1)
    setLocalSortCriteria(newCriteria)
  }

  const addCriterion = (field: string) => {
    // Check if field already exists in criteria
    if (!localSortCriteria.some((c) => c.field === field)) {
      setLocalSortCriteria([...localSortCriteria, { field, order: "asc" }])
    }
  }

  const clearAll = () => {
    setLocalSortCriteria([])
  }

  const applySort = () => {
    setSortCriteria(localSortCriteria)
    onClose()
  }

  // Available fields that can be added to sort
  const availableFields = [
    { name: "Client Name", icon: <User className="h-4 w-4 mr-2" /> },
    { name: "Created At", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { name: "Updated At", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { name: "Client ID", icon: <FileText className="h-4 w-4 mr-2" /> },
  ]

  const getIcon = (fieldName: string) => {
    const field = availableFields.find((f) => f.name === fieldName)
    return field ? field.icon : null
  }

  return (
    <div className="absolute right-0 top-0 z-10 w-[400px] bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Sort By</h3>
      </div>

      <div className="space-y-4 mb-6">
        {localSortCriteria.map((criterion, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
            <div className="flex items-center flex-1">
              {getIcon(criterion.field)}
              <span>{criterion.field}</span>
            </div>
            <div className="flex space-x-1">
              {criterion.field.includes("At") ? (
                <>
                  <Button
                    size="sm"
                    variant={criterion.order === "desc" ? "default" : "outline"}
                    className={`text-xs px-2 py-1 h-auto ${
                      criterion.order === "desc" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""
                    }`}
                    onClick={() => toggleOrder(index)}
                  >
                    Newest to Oldest
                  </Button>
                  <Button
                    size="sm"
                    variant={criterion.order === "asc" ? "default" : "outline"}
                    className={`text-xs px-2 py-1 h-auto ${
                      criterion.order === "asc" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""
                    }`}
                    onClick={() => toggleOrder(index)}
                  >
                    Oldest to Newest
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant={criterion.order === "asc" ? "default" : "outline"}
                    className={`text-xs px-2 py-1 h-auto ${
                      criterion.order === "asc" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""
                    }`}
                    onClick={() => toggleOrder(index)}
                  >
                    A-Z
                  </Button>
                  <Button
                    size="sm"
                    variant={criterion.order === "desc" ? "default" : "outline"}
                    className={`text-xs px-2 py-1 h-auto ${
                      criterion.order === "desc" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""
                    }`}
                    onClick={() => toggleOrder(index)}
                  >
                    Z-A
                  </Button>
                </>
              )}
            </div>
            <Button size="sm" variant="ghost" className="p-0 h-6 w-6" onClick={() => removeCriterion(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        {availableFields
          .filter((field) => !localSortCriteria.some((c) => c.field === field.name))
          .map((field, index) => (
            <div
              key={index}
              className="flex items-center p-2 text-gray-500 hover:bg-gray-50 rounded-md cursor-pointer"
              onClick={() => addCriterion(field.name)}
            >
              {field.icon}
              <span>{field.name}</span>
            </div>
          ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <Button variant="link" className="text-gray-500 p-0" onClick={clearAll}>
          Clear all
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800" onClick={applySort}>
          Apply Sort
        </Button>
      </div>
    </div>
  )
}
