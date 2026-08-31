export interface User {
  id: number | string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  id?: number | string;
  email?: string;
  name?: string;
  token?: string;
  accessToken?: string;
  user?: User;
  message?: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TOKEN_KEY = "stayly_jwt_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Support both CORS credentials (cookies) and Bearer tokens
  const config: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  const url = `${API_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network error";
    throw new ApiError(
      `Unable to connect to backend server at ${API_URL}. Please ensure the ASP.NET Core API is running. (${errorMsg})`,
      0
    );
  }

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    let errorData: unknown;

    try {
      errorData = await response.json();
      if (errorData && typeof errorData === "object") {
        const errorObj = errorData as Record<string, unknown>;
        if (typeof errorObj.message === "string") {
          errorMessage = errorObj.message;
        } else if (typeof errorObj.title === "string") {
          errorMessage = errorObj.title;
        } else if (errorObj.errors && typeof errorObj.errors === "object") {
          const validationErrors = Object.values(errorObj.errors as Record<string, string[]>)
            .flat()
            .join(". ");
          if (validationErrors) errorMessage = validationErrors;
        }
      }
    } catch {
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch {}
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

export async function loginApi(credentials: LoginRequest): Promise<{ user: User; token?: string }> {
  const data = await request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const token = data.token || data.accessToken;
  if (token) {
    setStoredToken(token);
  }

  const user: User = data.user || {
    id: data.id ?? 0,
    email: data.email ?? credentials.email,
    name: data.name ?? credentials.email.split("@")[0],
    role: data.role ?? "User"
  };

  return { user, token };
}

export async function registerApi(credentials: RegisterRequest): Promise<{ user: User; token?: string }> {
  const data = await request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const token = data.token || data.accessToken;
  if (token) {
    setStoredToken(token);
  }

  const user: User = data.user || {
    id: data.id ?? 0,
    email: data.email ?? credentials.email,
    name: data.name ?? credentials.name,
    role: data.role ?? "User"
  };

  return { user, token };
}

export async function getMeApi(): Promise<User> {
  //NOT IMPLEMENTED ON BACKEND
  const data = await request<AuthResponse>("/api/auth/me", {
    method: "GET",
  });

  if (data.user) return data.user;

  return {
    id: data.id ?? 0,
    email: data.email ?? "",
    name: data.name ?? "",
    role: data.role ?? "",
  };
}

export async function logoutApi(): Promise<void> {
  try {
    await request("/api/auth/logout", {
      method: "POST",
    });
  } catch {
    // Even if backend fails or is unreachable, clear client token
  } finally {
    clearStoredToken();
  }
}
