import {useAtom} from "jotai";
import {authorizationAtom} from '@/store/authorization-atom';
import {
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query';
import {API_ENDPOINTS} from "./client/api-endpoints";
import {userClient} from "./client/user";
import axios from "axios";
import {useToken} from "@/lib/hooks/use-token";
import Cookies from "js-cookie";
import {AUTH_CRED} from "@/lib/constants";

export function useUser() {
	const [isAuthorized] = useAtom(authorizationAtom);
	const { data, error, isLoading } = useQuery(
		[API_ENDPOINTS.ME],
		userClient.me,
		{
			enabled: isAuthorized,
			onError: (err) => {
				if (axios.isAxiosError(err)) {
					console.log(err.response?.status);
				}
			}
		}
	);

	return {
		data: data?.responseObject,
		isLoading,
		error,
	}
}

export function useLogin() {
	return useMutation(userClient.login);
}

export function useLogout() {
	const queryClient = useQueryClient();
	const {removeToken} = useToken();
	const [_,setAuthorized] = useAtom(authorizationAtom);

	const {mutate: signOut,isLoading} = useMutation(userClient.logout,{
		onSuccess: (data) => {
			if (data) {
				removeToken();
				Cookies.remove(AUTH_CRED);
				setAuthorized(false);
				//@ts-ignore
				resetCheckout();
				queryClient.refetchQueries(API_ENDPOINTS.ME);
			}
		},
		onSettled: () => {
			queryClient.clear();
		},
	});
	function handleLogout() {
		signOut();
	}
	return {
		mutate: handleLogout,
		isLoading,
	};
}