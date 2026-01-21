"use server";

export type SituatorEvent = {
  id: string;
  srcextension: string;
  situatoraccountcode: string;
  situatorzonecode: string;
  situatoreventcode: string;
  situatorpriority: string;
  situatorcondominium: string;
};

type ResponseErrorData = {
  statusCode: number;
  timestamp: string;
  message: string;
};

const BASE_URL = "http://localhost:3000/asterisk/situator-events";

function buildHeaders(authToken: string): HeadersInit {
  return {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };
}

async function parseError(result: Response): Promise<Error> {
  if (result.headers.get("Content-Type")?.includes("application/json")) {
    const { timestamp, message, statusCode }: ResponseErrorData =
      await result.json();
    console.error(`${timestamp} - ${statusCode}: ${message}`);
    return new Error(message);
  }

  console.error(
    `Error while calling ${result.url}: ${result.status} - ${result.statusText}`
  );
  return new Error("Um erro inesperado aconteceu. Por favor, tente mais tarde.");
}

export async function listSituatorEvents(
  authToken: string
): Promise<SituatorEvent[]> {
  if (!authToken) {
    throw new Error("Token de autenticacao ausente");
  }

  const result = await fetch(BASE_URL, {
    method: "GET",
    headers: buildHeaders(authToken),
    cache: "no-store",
  });

  if (result.ok) {
    return result.json();
  }

  throw await parseError(result);
}

export async function updateSituatorEvent(
  authToken: string,
  event: SituatorEvent
): Promise<SituatorEvent> {
  if (!authToken) {
    throw new Error("Token de autenticacao ausente");
  }

  const result = await fetch(`${BASE_URL}/${event.id}`, {
    method: "PUT",
    headers: buildHeaders(authToken),
    body: JSON.stringify({
      srcextension: event.srcextension,
      situatoraccountcode: event.situatoraccountcode,
      situatorzonecode: event.situatorzonecode,
      situatoreventcode: event.situatoreventcode,
      situatorpriority: event.situatorpriority,
      situatorcondominium: event.situatorcondominium,
    }),
  });

  if (result.ok) {
    return result.json();
  }

  throw await parseError(result);
}
