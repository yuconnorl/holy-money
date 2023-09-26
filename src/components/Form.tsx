"use client";

import { format } from "date-fns";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

import Date from "@/components/Date";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function FormComponent({ action, categories }) {
  const [date, setDate] = useState<Date>();
  const dataPickerRef = useRef(null);

  useEffect(() => {
    if (date) {
      const recordDate = dayjs(date).format("MMM-DD-YYYY");
      dataPickerRef.current.value = recordDate;
    }
  }, [date]);

  return (
    <form action={action} id="record-form">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input name="amount" id="amount" placeholder="$" />
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className={cn(
                  "w-max justify-start text-left font-normal text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Today</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <input
            type="text"
            id="recordDate"
            name="recordDate"
            ref={dataPickerRef}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Select name="category">
            <SelectTrigger id="category">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {categories.map(({ id, categoryName }) => (
                <SelectItem key={id} value={`${id}`}>
                  {categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="store">Store</Label>
          <Input name="store" id="store" placeholder="Name of store" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="amount">Memo</Label>
          <Input
            name="memo"
            id="memo"
            placeholder="memo (optional)"
            defaultValue={""}
          />
        </div>
      </div>
    </form>
  );
}
