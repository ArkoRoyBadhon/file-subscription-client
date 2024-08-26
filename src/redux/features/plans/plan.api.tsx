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
    getPlanById: builder.query({
      query: ({planId}) => {
        return ({
          url: `/plan/get/${planId}`,
          method: "GET",
        })
      },
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
    getPurchaseByUser: builder.query({
      query: () => {
        return ({
          url: `/purchase/get`,
          method: "GET",
        })
      },
      providesTags: ["plan"],
    }),
  }),
});
export const { useGetSubscriptionPlanQuery, useGetPlanByIdQuery, usePurchaseSubscriptionPlanMutation, useGetPurchaseByUserQuery } =
  planApi;
