import {Attachment} from "@/types";
import {HttpClient} from "./http-client";
import {API_ENDPOINTS} from "./api-endpoints";

export const uploadClient = {
	upload: (input: File[]) => {
		let formData = new FormData();
		input.forEach((attachment) => {
			formData.append('file',attachment);
		});
		return HttpClient.post<any>(API_ENDPOINTS.UPLOADS,formData,{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
}