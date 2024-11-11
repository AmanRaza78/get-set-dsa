"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Total Problems Solved";

const chartData = [
  {
    type: "easy",
    solved: 100,
    fill: "var(--color-easy)"
  },
  {
    type: "medium",
    solved: 200,
    fill: "var(--color-medium)"
  },
  {
    type: "hard",
    solved: 300,
    fill: "var(--color-hard)"
  },
];

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ]

const chartConfig = {
  solved: {
    label: "Solved",
  },
  easy: {
    label: "Easy",
    color: "hsl(var(--chart-1))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-2))",
  },
  hard: {
    label: "Hard",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig;

export default function TotalChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.solved, 0);
  }, []);

  return (
    <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="solved"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Solved
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
  );
}
