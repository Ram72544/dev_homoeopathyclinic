type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  timestamp: string;
  level: LogLevel;
  context?: string;
  message: string;
  data?: unknown;
}

function sanitize(data: unknown): unknown {
  if (!data || typeof data !== "object") return data;
  if (data instanceof Error) {
    return {
      name: data.name,
      message: data.message,
      stack: process.env.NODE_ENV === "development" ? data.stack : undefined,
    };
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (/token|secret|key|password|auth|chat_?id/i.test(key)) {
      sanitized[key] = "[REDACTED]";
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

function formatLog({ timestamp, level, context, message, data }: LogPayload): string {
  const ctx = context ? `[${context}] ` : "";
  const base = `[${timestamp}] [${level.toUpperCase()}] ${ctx}${message}`;
  if (data !== undefined) {
    const serialized = typeof data === "string" ? data : JSON.stringify(sanitize(data));
    return `${base} ${serialized}`;
  }
  return base;
}

export const logger = {
  debug(message: string, context?: string, data?: unknown) {
    if (process.env.NODE_ENV === "development") {
      const payload: LogPayload = {
        timestamp: new Date().toISOString(),
        level: "debug",
        context,
        message,
        data,
      };
      console.debug(formatLog(payload));
    }
  },

  info(message: string, context?: string, data?: unknown) {
    const payload: LogPayload = {
      timestamp: new Date().toISOString(),
      level: "info",
      context,
      message,
      data,
    };
    console.info(formatLog(payload));
  },

  warn(message: string, context?: string, data?: unknown) {
    const payload: LogPayload = {
      timestamp: new Date().toISOString(),
      level: "warn",
      context,
      message,
      data,
    };
    console.warn(formatLog(payload));
  },

  error(message: string, context?: string, error?: unknown) {
    const payload: LogPayload = {
      timestamp: new Date().toISOString(),
      level: "error",
      context,
      message,
      data: error,
    };
    console.error(formatLog(payload));
  },
};
