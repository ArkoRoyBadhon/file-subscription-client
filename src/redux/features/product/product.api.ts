import { api } from "@/redux/api/appSlice";

const productAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page, limit, sort, category }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (sort) params.append("sort", sort);
        if (category) params.append("category", category);

        return {
          url: `/product/get-all?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: ({productId}) => {
        return {
          url: `/product/get/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    productDownload: builder.query({
      query: ({productId}) => {
        return {
          url: `/product/download/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/product',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/product/${id}`,
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    userDownload: builder.query({
      query: () => {
        return {
          url: `/download/get`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useProductDownloadQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUserDownloadQuery
} = productAPI;
