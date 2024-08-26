import { api } from "@/redux/api/appSlice";

const planApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPlan: builder.query({
      query: () => ({
        url: "/plan/get-all",
        method: "GET",
        // body: post,
      }),
      providesTags: ["plan"],
    }),
    purchaseSubscriptionPlan: builder.mutation({
      query: (post) => ({
        url: "/purchase/create",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["plan"],
    }),
  }),
});
export const { useGetSubscriptionPlanQuery, usePurchaseSubscriptionPlanMutation } =
  planApi;
