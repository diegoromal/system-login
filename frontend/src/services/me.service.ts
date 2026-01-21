"use server";

export type MeServiceOutput = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type ResponseData = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type ResponseErrorData = {
  statusCode: number;
  timestamp: string;
  message: string;
};

export async function fetchCurrentUser(
  authToken: string
): Promise<MeServiceOutput> {
  if (!authToken) {
    throw new Error("Token de autenticação ausente");
  }

  const fetchOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const result = await fetch("http://localhost:3000/users/me", fetchOptions);

  if (result.ok) {
    const output: ResponseData = await result.json();

    return {
      id: output.id,
      email: output.email,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }

  if (result.status === 401) {
    throw new Error("Sessão expirada, faça login novamente.");
  }

  if (result.headers.get("Content-Type")?.includes("application/json")) {
    const { timestamp, message, statusCode }: ResponseErrorData =
      await result.json();
    console.error(`${timestamp} - ${statusCode}: ${message}`);

    throw new Error(message);
  }

  console.error(
    `Error while fetching logged user: ${result.status} - ${result.statusText}`
  );

  throw new Error("Um erro inesperado aconteceu. Por favor, tente mais tarde.");
}
