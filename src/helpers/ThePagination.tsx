"use client";
import React, { Dispatch, SetStateAction } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  reviewsData: any;
  currentAmount: number;
  reviewsPerAmount: number;
  setCurrentAmount: Dispatch<SetStateAction<number>>;
};

export default function ThePagination({
  reviewsData,
  currentAmount,
  reviewsPerAmount,
  setCurrentAmount,
}: PaginationProps) {
  let amounts = [];

  for (let i = 1; i <= Math.ceil(reviewsData / reviewsPerAmount); i++) {
    amounts.push(i);
  }

  const handleNextAmount = () => {
    if (currentAmount < amounts.length)
      setCurrentAmount((prevState) => prevState + 1);
  };
  const handlePreviousAmount = () => {
    if (currentAmount > 1) {
      setCurrentAmount((prevState) => prevState - 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="gap-4">
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer hover:bg-black hover:text-white"
            onClick={handlePreviousAmount}
          />
        </PaginationItem>

        {amounts.map((amount, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              className={`cursor-pointer rounded-[50%] ${
                currentAmount === amount ? "bg-black text-violet-100" : ""
              } hover:bg-black hover:text-white`}
              onClick={() => setCurrentAmount(amount)}
            >
              {amount}
            </PaginationLink>
          </PaginationItem>
        ))}

        {amounts.length > 4 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          ""
        )}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer hover:bg-black hover:text-white"
            onClick={handleNextAmount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
