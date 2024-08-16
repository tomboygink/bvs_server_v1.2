//import { FormValues } from "@hooks/useFormWithValidation";
import { FormValues } from "@hooks/useFormWithValidation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { ILocation } from "@src/types/ILocation";
import { IResponse } from "@src/types/IResponse";
import { createBodyQuery } from "@src/utils/functions";
import CONFIG from "./../../../../config/config.json";

export const locationAPI = createApi({
  reducerPath: "location",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
    baseUrl: `http://${CONFIG.server_config.host}:${CONFIG.server_config.port}`,
  }),
  tagTypes: ["location"],
  endpoints: (build) => ({
    getAllLocation: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETGROUPS, args),
      }),
      providesTags: () => ["location"],
    }),
    getLocationByParentId: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETGROUPSBYPARENTID, args),
      }),
      //providesTags: (result) => ["location"],
    }),
    createLocation: build.mutation<ILocation, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETGROUP, args),
      }),
      invalidatesTags: () => ["location"],
    }),
    editLocation: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.CHANGEGROUP, args),
      }),
      invalidatesTags: () => ["location"],
    }),
  }),
});

export const {
  useGetAllLocationQuery,
  useGetLocationByParentIdQuery,
  useCreateLocationMutation,
  useEditLocationMutation,
} = locationAPI;
