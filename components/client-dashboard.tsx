"use client"

import { useState } from "react"
import { Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientTable } from "@/components/client-table"
import { SortPanel } from "@/components/sort-panel"

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("All")
  const [showSortPanel, setShowSortPanel] = useState(false)
  const [sortCriteria, setSortCriteria] = useState([
    { field: "Client Name", order: "asc" },
    { field: "Created At", order: "desc" },
  ])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const toggleSortPanel = () => {
    setShowSortPanel(!showSortPanel)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8 border-b border-gray-200 w-full">
            {["All", "Individual", "Company"].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-1 ${activeTab === tab ? "font-bold border-b-2 border-black" : "text-gray-500"}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={toggleSortPanel}>
                <Filter className="h-5 w-5" />
              </Button>
              {sortCriteria.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {sortCriteria.length}
                </span>
              )}
            </div>
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="h-4 w-4 mr-2" /> Add Client
            </Button>
          </div>
        </div>

        <div className="relative">
          <ClientTable />
          {showSortPanel && (
            <SortPanel
              sortCriteria={sortCriteria}
              setSortCriteria={setSortCriteria}
              onClose={() => setShowSortPanel(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
