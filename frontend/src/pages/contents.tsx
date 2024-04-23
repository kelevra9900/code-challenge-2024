import Seo from "@/components/seo/seo"
import DashboardLayout from "@/layouts/_dashboard";

const ContentsPage = () => {
	return(
		<>
			<Seo noindex={true} nofollow={true} title="Contenido" />
			<div className="w-full overflow-hidden px-1 pb-1">
				<div className="mb-8 mt-10">
				</div>
			</div>
		</>
	)
}
ContentsPage.authenticationRequired = true;

ContentsPage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
}

export default ContentsPage;