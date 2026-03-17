// components/dashboard/revenue-chart.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { date: "Oct 1", revenue: 20000 },
  { date: "Oct 3", revenue: 35000 },
  { date: "Oct 6", revenue: 28000 },
  { date: "Oct 9", revenue: 40000 },
  { date: "Oct 10", revenue: 45000 },
  { date: "Oct 15", revenue: 38000 },
  { date: "Oct 16", revenue: 50000 },
  { date: "Oct 17", revenue: 48000 },
  { date: "Oct 18", revenue: 60000 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₦${value / 1000}k`}
              />
              <Tooltip
                wrapperClassName=""
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-2xl border border-primary/20 shadow-2xl/50 shadow-primary bg-primary! text-white p-2 ">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="">Date:</span>
                          <span className="font-medium">{label}</span>
                          <span className="">Revenue:</span>
                          <span className="font-medium">
                            ₦{payload[0].value?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
