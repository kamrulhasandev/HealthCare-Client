import { IDoctor } from "@/types/doctor";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { IMeta } from "@/types";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/user/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [TagTypes.doctor],
    }),
    getAllDoctors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/doctor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDoctor[], meta: IMeta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [TagTypes.doctor],
    }),
    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `/doctor/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.doctor],
    }),
    getDoctor: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.doctor],
    }),
    updateDoctor: build.mutation({
      query: (data) => ({
        url: `/doctor/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TagTypes.doctor],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useDeleteDoctorMutation,
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} = doctorApi;
