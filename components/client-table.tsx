"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface Client {
  id: string
  name: string
  type: string
  email: string
  status: "active" | "inactive"
  updatedBy: string
  updatedAt: string
}

export function ClientTable() {
  // Mock data for the table
  const clients: Client[] = [
    {
      id: "20",
      name: "John Doe",
      type: "Individual",
      email: "johndoe@email.com",
      status: "active",
      updatedBy: "M",
      updatedAt: "2025-04-26T12:00:00Z", // Example timestamp
    },
    {
      id: "21",
      name: "Jane Smith", // Updated name
      type: "Individual",
      email: "janesmith@email.com", // Unique email
      status: "active",
      updatedBy: "A", // UpdatedBy example
      updatedAt: "2025-04-25T14:30:00Z", // Example timestamp
    },
    {
      id: "23",
      name: "Michael Brown", // Updated name
      type: "Individual",
      email: "michaelbrown@email.com", // Unique email
      status: "inactive", // Example status
      updatedBy: "M",
      updatedAt: "2025-04-24T10:15:00Z", // Example timestamp
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[100px]">Client ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Client Type</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated By</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium">
                <Link href={`/clients/${client.id}`} className="text-blue-500 hover:underline">
                  {client.id}
                </Link>
              </TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.type}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span
                    className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      client.status === "active" ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                  <span className="capitalize">{client.status}</span>
                </div>
              </TableCell>
              <TableCell>{client.updatedBy}</TableCell>
              <TableCell>{new Date(client.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
