import axios from "axios";
import { createEffect } from "effector";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

interface Request {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
}

export const requestFx = createEffect<Request, any>((request) => {
  return api({
    method: request.method,
    url: request.path,
    data: request.body,
  })
    .then((response) => response.data)
    .catch((response) => Promise.reject(response.response.data));
});
