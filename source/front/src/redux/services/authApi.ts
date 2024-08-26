import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";
import CONFIG from "./../../../../config/config.json";
import { IResponse } from "@src/types/IResponse";
import { FormValues } from "@hooks/useFormWithValidation";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
    baseUrl: `http://${CONFIG.server_config.host}:${CONFIG.server_config.port}`,
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    auth: build.mutation({
      query: (body) => ({
        url: "/api",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    authBySessionCode: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETUSERBYSESSCODE, args),
      }),
      providesTags: () => ["Auth"],
    }),
    deleteSession: build.mutation<IResponse, FormValues>({
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
  useAuthMutation,
  useAuthBySessionCodeQuery,
  useDeleteSessionMutation,
} = authApi;
