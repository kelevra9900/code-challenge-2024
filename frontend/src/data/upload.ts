import {getPreviewImage} from "@/lib/get-preview-image";
import {useState} from "react";
import {FileWithPath} from 'react-dropzone';
import {useMutation} from "react-query";
import {uploadClient} from "./client/upload";

export const useUploads = ({onChange,defaultFiles}: any) => {
	const [files,setFiles] = useState('');

	const { mutate: upload, isLoading } = useMutation(uploadClient.upload,{
		onSuccess: (data: any) => {
			if (onChange) {
				onChange(data.path);
				setFiles(data.path);
			}
		},
	});

	function handleSubmit(data: File[]) {
		upload(data);
	}

	return {mutate: handleSubmit,isLoading,files};
};