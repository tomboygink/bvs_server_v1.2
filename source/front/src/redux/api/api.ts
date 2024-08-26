import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuery } from "@src/types/IQuery";
import { IResponse } from "@src/types/IResponse";
import CONFIG from "./../../../../config/config.json";

export const mainApi = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${CONFIG.server_config.host}:${CONFIG.server_config.port}`,
  }),
  endpoints: (builder) => ({
    fetch: builder.mutation<IResponse, IQuery>({
      query: (body) => ({
        url: "/api",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchMutation } = mainApi;
