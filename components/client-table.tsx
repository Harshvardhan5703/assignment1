"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  type: string;
  email: string;
  status: "active" | "inactive";
  updatedBy: string;
  updatedAt: string;
  createdAt: string; // New field added
}

interface ClientTableProps {
  clients: Client[]; // Accept clients data as a prop
}

export function ClientTable({ clients }: ClientTableProps) {
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
            <TableHead>Created At</TableHead> {/* Column for Created At */}
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
              <TableCell>{new Date(client.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}