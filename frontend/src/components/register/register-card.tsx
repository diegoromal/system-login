import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterCard() {
  const registerFormSchema = z
    .object({
      email: z.email("Email inválido"),
      password: z
        .string()
        .min(8, { message: "A senha deve conter pelo menos 8 caractéres" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Confirmação de senha é obrigatória" }),
    })
    .refine((data) => {
      return (
        data.password === data.confirmPassword,
        { message: "As senhas não coincidem", path: ["confirmPassword"] }
      );
    });

  type RegisterFormType = z.infer<typeof registerFormSchema>;

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onRegisterFormSubmit(input: RegisterFormType) {
    console.log("Form submitted: ", input);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>Entre com os dados</CardDescription>
        <CardAction>
          <Link href="/">
            <Button variant="link">Já possui uma Conta?</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onRegisterFormSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField control={form.control} name={"email"} render={({field})} => {
                  
                } />
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirme a Senha</Label>
                </div>
                <Input id="confirmPassword" type="password" required />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Criar
        </Button>
      </CardFooter>
    </Card>
  );
}
