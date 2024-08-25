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
  }),
});
export const {
  useGetSubscriptionPlanQuery
} = planApi;
