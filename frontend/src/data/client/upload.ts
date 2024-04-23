import {Attachment} from "@/types";
import {HttpClient} from "./http-client";
import {API_ENDPOINTS} from "./api-endpoints";

export const uploadClient = {
	upload: (input: File[]) => {
		let formData = new FormData();
		input.forEach((attachment) => {
			formData.append('attachment[]',attachment);
		});
		return HttpClient.post<Attachment[]>(API_ENDPOINTS.UPLOADS,formData,{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
}