import 'hono';

declare module 'hono' {
  interface ContextVariableMap{
    userID?: number;
  }
}