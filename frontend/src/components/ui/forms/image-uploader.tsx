import {UploadIcon} from "@/components/icons/upload-icon";
import {CldUploadWidget} from "next-cloudinary";
import Image from "next/image";
import {useCallback} from "react";

declare global {
	var cloudinary: any
}

const uploadPreset = "bqt7fe91";

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	onChange,
	value
}) => {
	const handleUpload = useCallback((result: any) => {
		onChange(result.info.secure_url);
	},[onChange]);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset={'bqt7fe91'}
			options={{
				maxFiles: 1
			}}
		>
			{({open}) => {
				return (
					<div
						onClick={() => open?.()}
						className="relative cursor-pointer hover:opacity-70 transition border-dashed  border-2  p-20  border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600
            "
					>
						<UploadIcon className="text-muted-light" />
						<div className="font-semibold text-lg">
							Click to upload
						</div>
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image
									fill
									style={{objectFit: 'cover'}}
									src={value}
									alt="Uploaded Image"
								/>
							</div>
						)}
					</div>
				)
			}}
		</CldUploadWidget>
	);
}

export default ImageUpload;
