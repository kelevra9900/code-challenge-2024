import * as React from "react"
import {SVGProps} from "react"
export const ESFlagRound = ({width = '32px',height = '32px'}: SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 32c5.119 0 9.673-2.406 12.601-6.146h-8.427C19.086 29.48 18.48 32 16 32ZM20.174 6.147h8.427C25.673 2.407 21.12 0 16 0c2.48 0 3.086 2.52 4.174 6.147Z"
          fill="#C42126"
        />
        <path
          d="M28.602 6.146h-8.427c1.7 5.67 1.7 14.038 0 19.706H28.6a15.923 15.923 0 0 0 3.4-9.853c0-3.717-1.272-7.136-3.399-9.853Z"
          fill="#FFC40C"
        />
        <path d="M16 32ZM15.051.028Z" fill="#C42126" />
        <path
          d="M21.352 25.854H3.399c2.744 3.505 6.917 5.84 11.643 6.119h.01c.314.018.63.028.948.028 2.48 0 4.264-2.521 5.352-6.147ZM3.399 6.147h17.953C20.264 2.521 18.48 0 16 0c-.318 0-.634.01-.949.028h-.009C10.316.309 6.143 2.643 3.4 6.149Z"
          fill="#D32030"
        />
        <path
          d="M0 16c0 3.718 1.271 7.136 3.399 9.852h17.953c1.7-5.668 1.7-14.037 0-19.706H3.399A15.926 15.926 0 0 0 0 16Z"
          fill="#FFD034"
        />
      </svg>
    </>
  );
};
