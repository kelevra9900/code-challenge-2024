import * as React from "react"
import {SVGProps} from "react"
export const ImageIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={800}
		height={800}
		fill="none"
		viewBox="0 0 24 24"
		{...props}
	>
		<path
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M16.5 14c-.284-1.141-1.519-2-3-2s-2.716.859-3 2m3-6h.01M18 21h-7.8c-2.52 0-3.78 0-4.743-.49a4.5 4.5 0 0 1-1.967-1.967C3 17.58 3 16.32 3 13.8V6m6.2 12h8.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 16.48 21 15.92 21 14.8V6.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 3 18.92 3 17.8 3H9.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C6 4.52 6 5.08 6 6.2v8.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C7.52 18 8.08 18 9.2 18Zm5.3-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
		/>
	</svg>
)
