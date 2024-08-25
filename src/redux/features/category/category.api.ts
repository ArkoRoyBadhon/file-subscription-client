import { api } from "@/redux/api/appSlice";

const categoryAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: `/category/get-all`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `/category`,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (category) => {
        console.log("id", category?._id);
        console.log("i category", category);
        
        return {
          url: `/category/${category?._id}`,
          method: "PATCH",
          body: category,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryAPI;
