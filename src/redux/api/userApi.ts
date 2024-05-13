import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const userAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [TagTypes.user],
    }),
  }),
});

export const { useGetSingleUserQuery } = userAPi;
