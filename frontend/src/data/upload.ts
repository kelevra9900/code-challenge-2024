import {getPreviewImage} from "@/lib/get-preview-image";
import {useState} from "react";
import {FileWithPath} from 'react-dropzone';
import {useMutation} from "react-query";
import {uploadClient} from "./client/upload";

export const useUploads = ({onChange,defaultFiles}: any) => {
	const [files,setFiles] = useState<FileWithPath[]>(
		getPreviewImage(defaultFiles)
	);

	const { mutate: upload, isLoading } = useMutation(uploadClient.upload,{
		onSuccess: (data: any) => {
			if (onChange) {
				const dataAfterRemoveTypename = data?.map(
					({__typename,...rest}: any) => rest
				);
				onChange(dataAfterRemoveTypename);
				setFiles(getPreviewImage(dataAfterRemoveTypename));
			}
		},
	});

	function handleSubmit(data: File[]) {
		upload(data);
	}

	return {mutate: handleSubmit,isLoading,files};
};