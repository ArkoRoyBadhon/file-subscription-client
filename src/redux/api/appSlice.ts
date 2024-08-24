import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { clearUser, setUser } from "../features/auth/auth.slice";
import { RootState } from "../store";

const url = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  // credentials: 'include',
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      try {
        const res = await fetch(`${url}/auth/refreshToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const newAccessToken = data?.data?.accessToken;

          if (newAccessToken) {
            const currentUser = (api.getState() as RootState).auth.user;
            if (currentUser) {
              // Dispatch the updated user with the new token
              api.dispatch(
                setUser({ ...currentUser })
              );

              // Retry the original request with the new token
              result = await baseQuery(args, api, extraOptions);
            }
          } else {
            api.dispatch(clearUser());
          }
        } else {
          api.dispatch(clearUser());
        }
      } catch (error) {
        api.dispatch(clearUser());
      }
    } else {
      api.dispatch(clearUser());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "user",
    "Product",
    "Category",
    "tag",
    "Sell",
    "Brand",
    "Tag",
    "customer",
  ],
  endpoints: () => ({}),
});
