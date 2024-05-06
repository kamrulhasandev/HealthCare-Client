import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [TagTypes.specialties],
    }),

    getAllSpecialty: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [TagTypes.specialties],
    }),

    deleteSpecialty: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.specialties],
    }),
  }),
});

export const {
  useCreateSpecialtyMutation,
  useGetAllSpecialtyQuery,
  useDeleteSpecialtyMutation,
} = specialtiesApi;
