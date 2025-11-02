/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ChartCom({
  totalIncome,
  totalExpense,
}: {
  totalIncome?: any;
  totalExpense?: any;
}) {
  return (
    <div className="flex justify-around w-full gap-5">
      <div className="w-full rounded-2xl border">
        <h1 className="text-3xl p-3 font-bold">Income</h1>
        <ChartContainer config={chartConfig} className="min-h-[100px] w-full ">
          <BarChart accessibilityLayer data={totalIncome}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 53)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="totalIncome" fill="var(--color-desktop)" radius={4} />

            {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </div>
      <div className="w-full border rounded-2xl">
        <h1 className="text-3xl p-3 font-bold">Expense</h1>
        <ChartContainer config={chartConfig} className="min-h-[100px] w-full ">
          <BarChart accessibilityLayer data={totalExpense}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 53)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="totalExpense"
              fill="var(--color-desktop)"
              radius={4}
            />

            {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
