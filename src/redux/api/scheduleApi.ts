import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { IMeta } from "@/types";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [TagTypes.schedule],
    }),
    getAllSchedules: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/schedule",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: [], meta: IMeta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [TagTypes.schedule],
    }),
    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.schedule],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
} = scheduleApi;
