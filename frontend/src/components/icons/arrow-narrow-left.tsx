import * as React from "react"
import {SVGProps} from "react"

const ArrowNarrowLeft= ({
  width,
  height,
  strokeWidth = 2,
  className,
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>
  );
};

export default ArrowNarrowLeft;
