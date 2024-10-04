import { Store } from "@/types/types";
import { Progress } from "@/components/ui/progress";
import { Rating } from "@mui/material";
import { transformReviewerName } from "@/utils/transformNames";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import ThePagination from "@/helpers/ThePagination";

type Props = {
  storeData: Store | undefined;
};

export default function TheReviews({ storeData }: Props) {
  const [currentAmount, setCurrentAmount] = useState(1);
  const [reviewsPerAmount] = useState(4);

  if (!storeData) {
    return <div>No reviews available.</div>;
  }

  const indexOfLastReview = currentAmount * reviewsPerAmount;
  const indexOfFirstReview = indexOfLastReview - reviewsPerAmount;

  const currentReviews = storeData.reviews?.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  console.log("total review array", storeData.totalReviewsArray);

  const totalReviews = storeData.totalReviews;
  const ratingsArray = storeData.totalReviewsArray;

  return (
    <div className="w-full xl:w-3/4 px-2 mt-10 xl:mt-0 space-y-6">
      <h2 className="text-3xl font-medium">Recensioner</h2>
      <div className="flex gap-2">
        <Rating
          name="read-only"
          max={1}
          sx={{
            fontSize: "4rem",
          }}
          value={storeData.averageRating.toFixed(1)}
          readOnly
          style={{ color: "goldenrod" }}
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold">
            <span className="text-4xl">
              {storeData.averageRating.toFixed(1)}
            </span>
            /5
          </h3>
          <p className="text-sm font-medium text-gray-600">
            Baserat på {storeData.totalReviews} recensioner
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {ratingsArray
          .map((count, index) => {
            const percentage = (count.count / totalReviews) * 100;
            return (
              <div
                key={index}
                className="flex flex-row gap-3 items-center mb-2.5"
              >
                <span>{count.stars}</span>
                <Rating
                  name="read-only"
                  precision={0.5}
                  size="medium"
                  value={count.stars}
                  readOnly
                  style={{ color: "goldenrod" }}
                />
                <Progress className="h-2" value={percentage} />
                <span>({count.count})</span>
              </div>
            );
          })
          .reverse()}
      </ul>
      <ul className="flex flex-col gap-6">
        {storeData.reviews &&
          storeData.reviews.length > 0 &&
          currentReviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col py-4 px-3 bg-slate-100 rounded-lg"
            >
              <div className="flex flex-row justify-between items-center ">
                <Rating
                  name="read-only"
                  precision={0.5}
                  size="medium"
                  value={review.rating}
                  readOnly
                  style={{ color: "goldenrod" }}
                />
                <div className="flex flex-row items-center gap-2 text-gray-600 text-sm">
                  <p>{transformReviewerName(review.reviewer)}</p>{" "}
                  <p>{review.createdAt}</p>
                  {review.isVerified ? <p>verified</p> : ""}
                </div>
              </div>
              <p className="pt-4 text-sm flex flex-row gap-0.5 text-gray-700 font-medium">
                <FaQuoteLeft size={6} className="text-gray-600" />
                {review.review}
                <FaQuoteRight size={6} className="text-gray-600" />
              </p>
            </div>
          ))}
        <ThePagination
          currentAmount={currentAmount}
          reviewsData={storeData.reviews.length}
          reviewsPerAmount={reviewsPerAmount}
          setCurrentAmount={setCurrentAmount}
        />
      </ul>
    </div>
  );
}
