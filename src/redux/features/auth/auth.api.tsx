import { api } from "@/redux/api/appSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (post) => ({
        url: "/user/register",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (post: { email: string; password: string }) => ({
        url: "/user/signin",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    getAuthor: builder.query({
      query: (token) => {
        return {
          url: `/user/auth-state`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAuthorQuery,
} = authApi;
