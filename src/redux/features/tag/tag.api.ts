import { api } from "@/redux/api/appSlice";

const TagAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => {
        return {
          url: `/tag/get-all`,
          method: "GET",
        };
      },
      providesTags: ["Tag"],
    }),
    getTagById: builder.query({
      query: (id) => {
        return {
          url: `/tag/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Tag"],
    }),
    createTag: builder.mutation({
      query: (newBrand) => ({
        url: "/tag/create",
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: ["Tag"],
    }),
    updateTag: builder.mutation({
      query: (brand) => ({
        url: `/tag/update/${brand?._id}`,
        method: "PATCH",
        body: brand,
      }),
      invalidatesTags: ["Tag"],
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/tag/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetAllTagsQuery,
  useGetTagByIdQuery,
} = TagAPI;
