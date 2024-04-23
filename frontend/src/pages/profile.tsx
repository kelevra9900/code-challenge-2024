import ProfileForm from "@/components/profile/profile-form";
import Seo from "@/components/seo/seo";
import {useUser} from "@/data/user";
import DashboardLayout from "@/layouts/_dashboard";


const ProfilePage = () => {
	const { data } = useUser();
	if (!data) return null;

	return(
		<>
			<Seo noindex={true} nofollow={true} title="Profile" />
			<div className="w-full overflow-hidden px-1 pb-1">
				<div className="mb-8 mt-10">
					<ProfileForm user={data} />
				</div>
			</div>
		</>
	);
}
ProfilePage.authenticationRequired = true;

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>;
};
export default ProfilePage;