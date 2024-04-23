import Seo from "@/components/seo/seo";
import DashboardLayout from "@/layouts/_dashboard";

const ThemesPage = () => {
	return(
		<>
			<Seo noindex={true} nofollow={true} title="Temas" />
			<div className="w-full overflow-hidden px-1 pb-1">
				<div className="mb-8 mt-10">

				</div>
			</div>
		</>
	)
}

ThemesPage.authenticationRequired = true;

ThemesPage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default ThemesPage;