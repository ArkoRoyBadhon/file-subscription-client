"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { useGetAuthorQuery } from "@/redux/features/auth/auth.api";
import {
  useGetPlanByIdQuery,
  useGetPurchaseByUserQuery,
} from "@/redux/features/plans/plan.api";
import Loading from "@/app/loading";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { data: planData, isSuccess: planSuccess } = useGetPlanByIdQuery({
    planId: user?.plan,
  });
  const { data: purchaseData, isSuccess: purchaseGetSuccess } =
    useGetPurchaseByUserQuery(undefined);

  console.log("user dd", purchaseData);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loading />
      ) : user ? (
        <div className="space-y-4">
          <h1 className="text-[35px] font-[700] text-primaryTxt">
            Hello <span className="text-btnColor">{user?.firstName}</span>,
          </h1>{" "}
          <div className="text-primaryTxt">
            <h2 className="text-xl font-semibold">Subscription Details</h2>
            <p>
              <strong>Plan:</strong> {planSuccess && planData.data.name}
            </p>
            <p>
              <strong>Available Limit:</strong>{" "}
              {planSuccess && planData.data.limit - (user.downloadedItems || 0)}{" "}
              items
            </p>
            <p>
              <strong>Downloaded Items:</strong> {user.downloadedItems || 0}
            </p>
            <p>
              <strong>Expires Date:</strong>{" "}
              {planSuccess && planData.data.expire
                ? (() => {
                    // Calculate the expiration date
                    const createdAt = new Date(
                      purchaseData?.data?.createdAt
                    ).getTime();
                    const expireTime =
                      planData.data.expire * 24 * 60 * 60 * 1000; 
                    const expirationDate = new Date(createdAt + expireTime);

                    const today = new Date();

                    return today > expirationDate
                      ? "Expired"
                      : expirationDate.toLocaleDateString();
                  })()
                : "N/A"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primaryTxt">
              Downloaded Items
            </h2>
            <ul>
              {/* {user.downloadedItems > 0 &&
               (
                user.downloadedItems.map((item, index) => (
                  <li key={index} className="border-b py-2">{item}</li>
                ))
              ) : ( */}
              <p className="text-slate-400">No items downloaded yet.</p>
              {/* )} */}
            </ul>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
