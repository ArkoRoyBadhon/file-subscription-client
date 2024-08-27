"use client";
import { useAppSelector } from "@/redux/hook";
import {
  useGetPlanByIdQuery,
  useGetPurchaseByUserQuery,
} from "@/redux/features/plans/plan.api";
import Loading from "@/app/loading";
import { useGetAuthorQuery } from "@/redux/features/auth/auth.api";
import { useUserDownloadQuery } from "@/redux/features/product/product.api";

const ProfilePage = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const { data: planData, isSuccess: planSuccess } = useGetPlanByIdQuery({
    planId: user?.plan,
  });
  const { data: purchaseData } = useGetPurchaseByUserQuery(undefined);
  const { data: userData, isSuccess: successUser } =
    useGetAuthorQuery(undefined);
  const { data: downloadsData, isSuccess: downloadsSuccess } =
    useUserDownloadQuery(undefined);

  return (
    <section className="container mx-auto p-4 (100vh-240px)] overflow-y-auto smoothBar">
      {loading ? (
        <Loading />
      ) : user ? (
        <div className="space-y-4">
          <h1 className="text-[35px] font-[700] text-primaryTxt">
            Hello <span className="text-btnColor">{user?.firstName}</span>,
          </h1>
          <div className="text-primaryTxt">
            <h2 className="text-xl font-semibold">Subscription Details</h2>
            <p>
              <strong>Plan:</strong> {planSuccess && planData.data.name}
            </p>
            <p>
              <strong>Available Limit:</strong>{" "}
              {planSuccess &&
                planData.data.limit -
                  ((successUser && userData.data.downloadedItems) || 0)}{" "}
              items
            </p>
            <p>
              <strong>Downloaded Items:</strong>{" "}
              {successUser && userData.data.downloadedItems}
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
            <h2 className="text-xl font-semibold text-primaryTxt mb-[20px]">
              Downloaded Items
            </h2>
            {downloadsSuccess && downloadsData.data.length > 0 ? (
              <ul>
                {downloadsData.data.map((download: any) => (
                  <li key={download._id} className="border-b py-2">
                    <div className="flex items-center">
                      <img
                        // src={download.photo}
                        src="/images/img2.jpg"
                        alt={download.filename}
                        className="w-12 h-12 object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold">{download.filename}</p>
                        <p className="text-sm text-gray-500">{download.fileType}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400">No items downloaded yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </section>
  );
};

export default ProfilePage;
