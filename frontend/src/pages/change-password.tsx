import ChangePasswordForm from "@/components/auth/change-password-form";
import Seo from "@/components/seo/seo";
import Card from "@/components/ui/cards/card";
import DashboardLayout from "@/layouts/_dashboard";


const ChangePasswordPage = () => {
	return(
		<>
			<Seo noindex={true} nofollow={true} />
			<Card className="w-full mt-10">
				<h1 className="mb-5 text-lg font-semibold text-heading sm:mb-8 sm:text-xl">
					Cambiar contraseña
				</h1>
				<ChangePasswordForm />
			</Card>
		</>
	);
}

ChangePasswordPage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export default ChangePasswordPage;