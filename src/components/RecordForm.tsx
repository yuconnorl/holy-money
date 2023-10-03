"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { addNewRecord } from "@/utils/actions";

const formSchema = z.object({
  amount: z.string({
    required_error: "Amount should greater than zero",
  }),
  recordDate: z.date({
    required_error: "A date of record is required.",
  }),
  category: z.string({
    required_error: "Please choose a proper category for the record",
  }),
  store: z
    .string({
      required_error: "Please input the store name",
    })
    .max(30),
  memo: z.string().max(100).optional(),
});

interface Category {
  id: number;
  categoryName: string;
}

interface Props {
  categories: Array<Category>;
}

const RecordForm = ({ categories }: Props) => {
  const [isPending, startTransition] = useTransition();

  const rhfMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = rhfMethods.handleSubmit(
    async (d: z.infer<typeof formSchema>) => {
      startTransition(async () => {
        d.recordDate = dayjs(d.recordDate).format("MMM-DD-YYYY");

        await addNewRecord(d).then(() => {
          toast({
            description: "New record added!",
          });
        });
      });
    }
  );

  return (
    <>
      <Form {...rhfMethods}>
        <form action={handleFormSubmit} className="space-y-4">
          <FormField
            control={rhfMethods.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="$" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={rhfMethods.control}
            name="recordDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={rhfMethods.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find((category) => {
                              return `${category.id}` === field.value;
                            })?.categoryName
                          : "Select category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map(({ id, categoryName }) => {
                          const stringifyId = id.toString();

                          return (
                            <CommandItem
                              value={categoryName}
                              key={id}
                              onSelect={() => {
                                rhfMethods.setValue("category", stringifyId);
                              }}
                            >
                              {categoryName}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  stringifyId === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={rhfMethods.control}
            name="store"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Store</FormLabel>
                  <FormControl>
                    <Input placeholder="name of store" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={rhfMethods.control}
            name="memo"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Memo</FormLabel>
                  <FormControl>
                    <Input placeholder="anything else...?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button disabled={isPending} type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RecordForm;
