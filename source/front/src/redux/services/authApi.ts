import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    authBySessionCode: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETUSERBYSESSCODE, args),
      }),
      providesTags: () => ["Auth"],
    }),
  }),
});

export const { useAuthBySessionCodeQuery } = authApi;
