/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";

import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { PopoverContent } from "./ui/popover";
import { formatDate, subDays } from "date-fns";
import type { DateParams } from "@/types/date";

export type DateRange = {
  from: Date;
  to: Date;
};

interface DateFilterProps {
  setDateParams: React.Dispatch<React.SetStateAction<DateParams | undefined>>;
}
export function DateFilter({ setDateParams }: DateFilterProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  //   setDateParams({
  //     range: "custom",
  //     startDate: dateRange.from,
  //     endDate: dateRange.to,
  //   });
  useEffect(() => {
    setDateParams({
      range: "custom",
      startDate: formatDate(dateRange.from, "yyyy-MM-dd"),
      endDate: formatDate(dateRange.to, "yyyy-MM-dd"),
    });
  }, [dateRange]);
  //   console.log(dateRange.from.toString());
  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <div className="flex gap-3">
          <Button onClick={() => setDateParams({ range: "1d" })}>1d</Button>
          <Button onClick={() => setDateParams({ range: "7d" })}>7d</Button>
          <Button onClick={() => setDateParams({ range: "30d" })}>30d</Button>
        </div>
        <div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {dateRange.from.toLocaleDateString("en-gb")}-
                  {dateRange.to.toLocaleDateString("en-GB")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white w-full">
                <div className="bg-white">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(value) =>
                      value?.from &&
                      value.to &&
                      setDateRange({ from: value.from, to: value.to })
                    }
                    numberOfMonths={2}
                    disabled={(date) => date > new Date()}
                    className="rounded-lg border shadow-sm bg-white"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
}
