"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login, signup } from "./actions";
import { formSchema } from "./schema";
import { TypographyH2 } from "@/components/ui/typographyH2";

export default function Page() {
  const [tabValue, setTabValue] = useState("login");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(e: z.infer<typeof formSchema>) {
    const response = tabValue === "login" ? await login(e) : await signup(e);
    if (response) {
      form.setError("password", { message: response });
    }
  }

  return (
    <div className="h-px grow w-full max-w-xl">
      <TypographyH2>Login</TypographyH2>
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        className="w-full max-w-xl mt-4"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value={tabValue}>
          <Card className="rounded-lg">
            <CardHeader>
              {tabValue === "login" ? (
                <>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Login to an existing account
                  </CardDescription>
                </>
              ) : (
                <>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>Create a new account</CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Type here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Type here"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="place-self-end"
                    disabled={form.formState.isSubmitting}
                    type="submit"
                  >
                    {form.formState.isSubmitting ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
