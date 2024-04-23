import {LoginUserInput, UserResponse} from "@/types";
import {API_ENDPOINTS} from "./api-endpoints"
import {HttpClient} from "./http-client"

export const userClient = {
	me: () => {
		return HttpClient.get<UserResponse>(API_ENDPOINTS.ME);
	},
	login: (input: LoginUserInput) => {
		return HttpClient.post<UserResponse>(API_ENDPOINTS.LOGIN, input);
	},
	logout: () => HttpClient.post<boolean>(API_ENDPOINTS.USERS_LOGOUT,{}),
}