"use client";

import { setAuthTokens } from "@/lib/auth-storage";
import { loginService } from "@/services/login.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export type UseFormLoginType = {
  form: ReturnType<typeof useForm<LoginFormType>>;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
};

export default function useFormLogin(): UseFormLoginType {
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onLoginFormSubmit(input: LoginFormType) {
    try {
      const result = await loginService({
        email: input.email,
        password: input.password,
      });

      setAuthTokens({
        authToken: result.authToken,
        refreshToken: result.refreshToken,
      });

      toast.success("Login realizado com sucesso", {
        description: "Você já pode acessar sua conta.",
        icon: <Check />,
      });

      router.replace("/dashboard");
    } catch (error) {
      const err = error as Error;

      toast.error("Erro ao fazer login", {
        description: err.message,
        icon: <CircleX />,
      });
    }
  }

  const onSubmit = async (event?: React.BaseSyntheticEvent) =>
    form.handleSubmit(onLoginFormSubmit)(event);

  return {
    form,
    onSubmit,
  };
}
