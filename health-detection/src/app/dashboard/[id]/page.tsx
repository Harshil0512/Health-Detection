"use client";

import Image from "next/image";
import { MoreHorizontal, Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ActivityTab({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);
  interface Activity {
    id: number;
    name: string;
    totalImages: number;
    createdAt: string;
    report: string;
  }

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulate fetching or setting the activities on client-side mount
    const fetchedActivities = [
      {
        id: 1,
        name: "Chest Canser Treatment Test 1",
        totalImages: 1,
        createdAt: "2024-09-02",
        report: "Completed"
      },
      {
        id: 2,
        name: "Chest Canser Treatment Test 2",
        totalImages: 3,
        createdAt: "2024-09-01",
        report: "Completed"
      },
      {
        id: 3,
        name: "Chest Canser Treatment Test 3",
        totalImages: 2,
        createdAt: "2024-09-01",
        report: "Completed"
      },
      {
        id: 4,
        name: "Chest Canser Treatment Test 4",
        totalImages: 5,
        createdAt: "2024-08-27",
        report: "Completed"
      },
      {
        id: 5,
        name: "Chest Canser Treatment Test 5",
        totalImages: 2,
        createdAt: "2024-08-27",
        report: "Completed"
      },
      {
        id: 6,
        name: "Chest Canser Treatment Test 6",
        totalImages: 1,
        createdAt: "2024-08-27",
        report: "Completed"
      },
      {
        id: 7,
        name: "Chest Canser Treatment Test 7",
        totalImages: 3,
        createdAt: "2024-08-24",
        report: "Completed"
      },
      {
        id: 8,
        name: "Chest Canser Treatment Test 8",
        totalImages: 4,
        createdAt: "2024-08-24",
        report: "Completed"
      },
      {
        id: 9,
        name: "Chest Canser Treatment Test 9",
        totalImages: 5,
        createdAt: "2024-08-22",
        report: "Completed"
      },
      {
        id: 10,
        name: "Chest Canser Treatment Test 10",
        totalImages: 1,
        createdAt: "2024-08-21",
        report: "Completed"
      }
    ];

    setActivities(fetchedActivities);
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <Tabs defaultValue="activities">
      <TabsContent value="activities" className="m-5">
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>Track Your Acitivities</CardTitle>
            <CardDescription>
              View Your Activities and get insights on your health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Total Images</TableHead>
                  <TableHead className="hidden md:table-cell">Created at</TableHead>
                  <TableHead>Report</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{activity.totalImages}</TableCell>
                    <TableCell className="hidden md:table-cell">{activity.createdAt}</TableCell>
                    <TableCell>
                      <Badge>{activity.report}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                          <Link href={`/dashboard/${id}/activity/9a2fbbdf96cc37c08466ffd9`}>View</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
