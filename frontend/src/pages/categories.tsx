import CreateFormCategory from "@/components/categories/form-category";
import Seo from "@/components/seo/seo"
import Card from "@/components/ui/cards/card";
import DashboardLayout from "@/layouts/_dashboard";

const CategoriesPage = () => {
	return (
		<>
			<Seo noindex={true} nofollow={true} title="Categorias" />
			<div className="w-full overflow-hidden px-1 pb-1">
				<div className="mb-8">
					<Card className="w-full mt-10">
						<CreateFormCategory />
					</Card>
				</div>
			</div>
		</>
	)
}

CategoriesPage.authenticationRequired = true;

CategoriesPage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
}

export default CategoriesPage;