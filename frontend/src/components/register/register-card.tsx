"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import useFormRegister from "@/hooks/register/useFormRegister";

export function RegisterCard() {
  const { form, onSubmit } = useFormRegister();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>Entre com os dados</CardDescription>
        <CardAction>
          <Link href="/">
            <Button variant="link">Faça o login!</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name={"email"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@acme.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name={"password"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Senha</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name={"confirmPassword"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirme a Senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex-col gap-2 py-8">
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
