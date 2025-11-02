/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

import {
  TransactionIncome,
  TransactionExpense,
} from "@/constants/transectionSource";
import type { TFormType } from "@/types/formType";
import { useAddTransactionMutation } from "@/redux/features/api/transactionApi";
import { toast } from "sonner";

const formSchema = z.object({
  amount: z.coerce.number().min(1, "Amount is required").transform(Number),
  type: z.string(),
  paymentMethod: z.enum(["bank", "cash"]),
  source: z
    .enum([
      "YouTube",
      "Agency",
      "Course",
      "Salary",
      "Office",
      "Food",
      "Invest",
      "Ad Run",
      "Other",
    ])
    .optional(),
  relatedTo: z.string().optional(),
  note: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().transform((d) => new Date(d)),
});

type FormSchemaType = z.infer<typeof formSchema>;
export function TransactionForm({ formType }: { formType: TFormType }) {
  // console.log(date);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      amount: 1,
      type: formType === "expense" ? "expense" : "income",
      paymentMethod: "cash",
      source: "YouTube",
      date: new Date(),
      description: "",
      note: "",
    },
  });

  const [addTransaction, { isLoading }] = useAddTransactionMutation();

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const result = await addTransaction(data).unwrap();
      toast(result?.message);
    } catch (error: any) {
      toast(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>
          <span>Add your {formType}</span>
        </CardTitle>
        <CardDescription>
          {/* <span> Help us improve by reporting bugs you encounter.</span> */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Amount</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Amount"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="paymentMethod"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="paymentMethod">
                    Payment Method
                  </FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="source"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="source">Source</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    {formType === "expense" ? (
                      <SelectContent>
                        {TransactionExpense.map((expense) => (
                          <SelectItem value={expense} key={expense}>
                            {expense}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    ) : (
                      <SelectContent>
                        {TransactionIncome.map((income) => (
                          <SelectItem value={income} key={income}>
                            {income}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Select Transaction Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={` justify-start text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(day) =>
                          day > new Date() || day < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />
            <Controller
              name="note"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-note">Note</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Note"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-note">Description</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Note"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          {isLoading ? (
            <Button disabled>
              <Spinner />
              Submit
            </Button>
          ) : (
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
}
