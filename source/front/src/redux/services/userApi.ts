import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";
import { IUser } from "@src/types/IUser";

import { FormValues } from "@hooks/useFormWithValidation";
import { IResponse } from "@src/types/IResponse";
import CONFIG from "./../../../../config/config.json";
export const userAPI = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    //baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
    baseUrl: `http://${CONFIG.server_config.host}:${CONFIG.server_config.port}`,
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
    sendEmail: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SENDCODEEMAIL, args),
      }),
    }),
    confirmEmail: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.CONFIRMEMAIL, args),
      }),
    }),
    sendResetPasswordCode: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SENDRESETPASSCODE, args),
      }),
    }),
    resetPassword: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.RESETPASSWORD, args),
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useSendEmailMutation,
  useConfirmEmailMutation,
  useSendResetPasswordCodeMutation,
  useResetPasswordMutation,
} = userAPI;
