"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconChevronDown } from "@tabler/icons-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Free", value: 300 },
  { name: "Pro", value: 200 },
  { name: "Business", value: 155 },
  { name: "Enterprise", value: 155 },
];

export function PlansChart() {
  return (
    <Card className="w-full border-none shadow-none col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Top Performing Plans
        </CardTitle>
        <div className="flex items-center text-xs font-bold text-primary cursor-pointer">
          THIS MONTH
          <IconChevronDown />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, left: -20, bottom: 10 }}
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#888", fontSize: 14 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#888", fontSize: 14 }}
                ticks={[0, 100, 200, 300]}
              />
              <Bar dataKey="value" radius={[15, 15, 0, 0]} barSize={70}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#C7B8FF" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
