import React from "react";
import Skeleton from "react-loading-skeleton";

const WaitingSkeleton = (width, count) => {
  return (
    <div className="WaitingSkeleton">
      <Skeleton width={width} count={count} />
    </div>
  );
};

export default WaitingSkeleton;
