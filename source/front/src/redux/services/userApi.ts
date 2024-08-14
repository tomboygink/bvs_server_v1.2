import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";
import { IUser } from "@src/types/IUser";

import { FormValues } from "@hooks/useFormWithValidation";
import { IResponse } from "@src/types/IResponse";

export const userAPI = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETUSERS, args),
      }),
      providesTags: () => ["User"],
    }),
    createUser: build.mutation<IUser, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETUSER, args),
      }),
      invalidatesTags: () => ["User"],
    }),

    editUser: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.CHANGEUSER, args),
      }),
      invalidatesTags: () => ["User"],
    }),
    confirmEmail: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SENDCODEEMAIL, args),
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useConfirmEmailMutation,
} = userAPI;
