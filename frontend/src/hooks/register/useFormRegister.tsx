"use client";

import { registerService } from "@/services/register.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleX } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

export type UseFormRegisterType = {
  form: ReturnType<typeof useForm<RegisterFormType>>;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
};

export default function useFormRegister(): UseFormRegisterType {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onRegisterFormSubmit(input: RegisterFormType) {
    try {
      const result = await registerService({
        email: input.email,
        password: input.password,
      });

      toast.success("Usuário registrado com sucesso", {
        description: result.message,
        icon: <Check />,
      });
    } catch (error) {
      const err = error as Error;

      toast.error("Erro ao registrar o usuário", {
        description: err.message,
        icon: <CircleX />,
      });
      return;
    }
  }

  const onSubmit = async (event?: React.BaseSyntheticEvent) =>
    form.handleSubmit(onRegisterFormSubmit)(event);

  const output = {
    form,
    onSubmit,
  };

  return output;
}
