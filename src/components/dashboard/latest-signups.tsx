// components/dashboard/latest-signups.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const signups = [
  {
    name: "Adebanjo Promise",
    email: "Adebanjo@gmail.com",
    plan: "Free",
    joined: "3 days ago",
    status: "Active",
  },
  {
    name: "Daniel Ololade",
    email: "Daniel@gmail.com",
    plan: "Premium",
    joined: "4 days ago",
    status: "Trial expire",
  },
  {
    name: "Daniel Ololade",
    email: "Daniel@gmail.com",
    plan: "Premium",
    joined: "4 months ago",
    status: "In-active",
  },
  {
    name: "Adebanjo Promise",
    email: "Adebanjo@gmail.com",
    plan: "Free",
    joined: "3 days ago",
    status: "Active",
  },
];

const statusColors = {
  Active: "bg-green-500/10 text-green-500",
  "Trial expire": "bg-red-500/10 text-red-500",
  "In-active": "bg-gray-500/10 text-gray-500",
};

export function LatestSignups() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Latest Signups</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {signups.map((signup, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {signup.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {signup.name}
                  </div>
                </TableCell>
                <TableCell>{signup.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{signup.plan}</Badge>
                </TableCell>
                <TableCell>{signup.joined}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      statusColors[signup.status as keyof typeof statusColors],
                      " rounded-sm uppercase",
                    )}
                  >
                    {signup.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-end gap-2 text-sm text-muted-foreground">
          <span>page 1 of 5</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
