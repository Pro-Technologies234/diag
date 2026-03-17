// components/dashboard/metric-card.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {trend === "up" ? (
            <IconTrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <IconTrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={cn(
              "text-xs",
              trend === "up" ? "text-green-500" : "text-red-500",
            )}
          >
            {change}
          </span>
          <span className="text-xs text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
