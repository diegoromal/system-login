"use server";

export type LoginServiceInput = {
  email: string;
  password: string;
};

export type LoginServiceOutput = {
  authToken: string;
  refreshToken: string;
};

type RequestData = {
  email: string;
  password: string;
};

type ResponseData = {
  authToken: string;
  refreshToken: string;
};

type ResponseErrorData = {
  statusCode: number;
  timestamp: string;
  message: string;
};

export async function loginService(
  input: LoginServiceInput
): Promise<LoginServiceOutput> {
  const data: RequestData = {
    email: input.email,
    password: input.password,
  };

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const result = await fetch("http://localhost:3000/users/login", fetchOptions);

  if (result.ok) {
    const output: ResponseData = await result.json();

    return {
      authToken: output.authToken,
      refreshToken: output.refreshToken,
    };
  }

  if (result.headers.get("Content-Type")?.includes("application/json")) {
    const { timestamp, message, statusCode }: ResponseErrorData =
      await result.json();
    console.error(`${timestamp} - ${statusCode}: ${message}`);

    throw new Error(message);
  }

  console.error(
    `Error while logging in user: ${result.status} - ${result.statusText}`
  );

  throw new Error("Um erro inesperado aconteceu. Por favor, tente mais tarde.");
}
