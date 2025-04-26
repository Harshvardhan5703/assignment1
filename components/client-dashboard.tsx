"use client";

import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientTable } from "@/components/client-table";
import { SortPanel } from "@/components/sort-panel";

interface Client {
  id: string;
  name: string;
  type: string;
  email: string;
  status: "active" | "inactive";
  updatedBy: string;
  updatedAt: string;
  createdAt: string;
}

const mockClients: Client[] = [
  {
    id: "20",
    name: "John Doe",
    type: "Individual",
    email: "johndoe@email.com",
    status: "active",
    updatedBy: "M",
    updatedAt: "2025-04-26T12:00:00Z",
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "21",
    name: "Jane Smith",
    type: "Individual",
    email: "janesmith@email.com",
    status: "active",
    updatedBy: "A",
    updatedAt: "2025-04-25T14:30:00Z",
    createdAt: "2025-02-15T09:30:00Z",
  },
  {
    id: "23",
    name: "Michael Brown",
    type: "Company",
    email: "michaelbrown@email.com",
    status: "inactive",
    updatedBy: "M",
    updatedAt: "2025-04-24T10:15:00Z",
    createdAt: "2025-03-10T08:20:00Z",
  },
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [sortCriteria, setSortCriteria] = useState([
    { field: "Client Name", order: "asc" },
    { field: "Created At", order: "desc" },
  ]);
  const [clients, setClients] = useState(mockClients);

  // Dynamic filtering based on activeTab
  const filterClientsByTab = (tab: string) => {
    if (tab === "All") return mockClients;
    return mockClients.filter((client) => client.type === tab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const filteredClients = filterClientsByTab(tab);
    setClients(filteredClients); // Update clients state with filtered data
  };

  const toggleSortPanel = () => {
    setShowSortPanel(!showSortPanel);
  };

  const sortClients = (clients: Client[], criteria: typeof sortCriteria) => {
    let sortedClients = [...clients];

    criteria.forEach(({ field, order }) => {
      sortedClients.sort((a, b) => {
        const fieldA = a[field as keyof Client];
        const fieldB = b[field as keyof Client];

        if (fieldA && fieldB) {
          if (fieldA > fieldB) return order === "asc" ? 1 : -1;
          if (fieldA < fieldB) return order === "asc" ? -1 : 1;
        }
        return 0;
      });
    });

    return sortedClients;
  };

  const handleSortApply = (criteria: typeof sortCriteria) => {
    setSortCriteria(criteria);
    const sortedData = sortClients(clients, criteria);
    setClients(sortedData); // Update the clients state with sorted data
    setShowSortPanel(false); // Close the sort panel
  };

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
                className={`py-4 px-1 ${
                  activeTab === tab ? "font-bold border-b-2 border-black" : "text-gray-500"
                }`}
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
          <ClientTable clients={clients} />
          {showSortPanel && (
            <SortPanel
            // @ts-ignore
              sortCriteria={sortCriteria}
              setSortCriteria={handleSortApply} // Pass sorting handler
              onClose={() => setShowSortPanel(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}