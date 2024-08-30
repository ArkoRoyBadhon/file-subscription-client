import { api } from "@/redux/api/appSlice";

const planApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPrices: builder.query({
      query: () => ({
        url: "/subs/prices",
        method: "GET",
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
export const { useGetSubscriptionPricesQuery, useGetPlanByIdQuery, usePurchaseSubscriptionPlanMutation, useGetPurchaseByUserQuery } =
  planApi;
