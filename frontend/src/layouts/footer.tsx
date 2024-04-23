import Link from "@/components/ui/link";
import Logo from "@/components/ui/logo";


const Footer = () => {
	return (
		<div className="flex w-full flex-col border-t border-gray-800 border-t-border-100 bg-white px-5 md:px-10 lg:border-b-8 lg:px-[50px] xl:px-16">
			{/* Top			 */}
			<div className="grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 pt-16 md:grid-cols-3 lg:pt-24 lg:pb-16 xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 2xl:grid-cols-5">
				<div className="flex flex-col">
					<div className="mb-[2px] flex h-16 items-start">
						<Logo />
					</div>
					<Link
						className="mb-1 text-sm text-heading"
						href={`mailto:torresroger445@gmail.com`}
					>
						torresroger445@gmail.com
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Footer;