"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Nigeria", value: 160, percentage: 40, color: "#5E48E8" },
  { name: "UK", value: 80, percentage: 20, color: "#C7B8FF" },
  { name: "US", value: 120, percentage: 30, color: "#45D3FF" },
  { name: "Others", value: 40, percentage: 10, color: "#95F120" },
];

export function CountryDistributionChart() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          User Distribution by Country
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                stroke="none"
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Total Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#1A1A1A]">400</span>
            <span className="text-[10px] uppercase text-muted-foreground">
              Total users
            </span>
          </div>
        </div>

        {/* Two-Column Legend Grid */}
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name} ({item.percentage}%)
                </span>
              </div>
              <span className="pl-4 text-sm font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
