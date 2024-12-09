const PROJECT_ID = process.env.APP_PROJECT_ID;

type Service = "auth" | "database" | "storage";

type ServiceMap = {
  [key in Service]: string;
};

const serviceBaseUrl: ServiceMap = {
  auth: "http://localhost:9099/emulator/v1/projects",
  database: "http://localhost:8080/emulator/v1/projects",
  storage: "http://localhost:9199/emulator/v1/projects",
};

export const client = async (
  service: Service,
  endpoint: string,
  { body, ...customConfig }: RequestInit = {},
) => {
  const CURRENT_BASE_URL = serviceBaseUrl[service];

  const defaultHeaders = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...defaultHeaders,
      ...customConfig.headers,
    },
  };

  try {
    const response = await fetch(
      `${CURRENT_BASE_URL}/${PROJECT_ID}/${endpoint}`,
      config,
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Fetch not success: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};
