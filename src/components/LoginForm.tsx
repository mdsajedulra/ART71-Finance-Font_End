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

import { toast } from "sonner";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      email: "admi2@gmail.com",
      password: "adminadmin",
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
    try {
      const result = await login(data).unwrap();
      dispatch(
        setUser({ token: result?.data?.token, user: result?.data?.email })
      );
      console.log(result);
      if (result?.success) {
        toast(result?.message);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      toast(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full sm:max-w-md">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-semibold text-center">Login</h1>
          </CardTitle>
          <CardDescription>
            {/* <span> Help us improve by reporting bugs you encounter.</span> */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="off"
                      type="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-note">Password</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your Password"
                      autoComplete="off"
                      type="password"
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
          <Field orientation="vertical">
            {isLoading ? (
              <Button disabled>
                <Spinner />
                Login
              </Button>
            ) : (
              <Button type="submit" form="form-rhf-demo">
                Login
              </Button>
            )}
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
