import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";
import CONFIG from "./../../../../config/config.json";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
    baseUrl: `http://${CONFIG.server_config.host}:${CONFIG.server_config.port}`,
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    auth: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETUSERBYLOGIN, args),
      }),
      providesTags: () => ["Auth"],
    }),
    authBySessionCode: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETUSERBYSESSCODE, args),
      }),
      providesTags: () => ["Auth"],
    }),
    deleteSession: build.mutation({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.DELETESESSCODE, args),
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useAuthQuery,
  useAuthBySessionCodeQuery,
  useDeleteSessionMutation,
} = authApi;
