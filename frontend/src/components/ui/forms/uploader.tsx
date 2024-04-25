import { useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from '@/components/icons/upload-icon';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useUploads } from '@/data/upload';

export default function Uploader({
  onChange,
  value,
  name,
  onBlur,
  multiple = false,
}: any) {
  const {
    mutate: upload,
    isLoading,
    files,
  } = useUploads({
    onChange,
    defaultFiles: value,
  });

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      upload(acceptedFiles);
    },
    [upload]
  );
  const ngrok = 'uploadPath'
  const { getRootProps, getInputProps } = useDropzone({
    //@ts-ignore
    accept: 'image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    multiple,
    onDrop,
  });
  const thumbs = files && (
    <div
      className="relative inline-flex flex-col mt-2 overflow-hidden border rounded border-border-100 ltr:mr-2 rtl:ml-2"
    >
      <div className="flex items-center justify-center w-16 h-16 min-w-0 overflow-hidden">
        {/* eslint-disable */}
        <img crossOrigin='anonymous' src={files} alt={files} />
      </div>
    </div>
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
        })}
      >
        <input
          {...getInputProps({
            name,
            onBlur,
          })}
        />
        <UploadIcon className="text-muted-light" />
        <p className="mt-4 text-sm text-center text-body">
          <span className="font-semibold text-accent">
            Carga un archivo
          </span>{' '}
          O arratralo aquí <br />
          <span className="text-xs text-body">
            PNG, JPG, GIF, WEBP, PDF, DOC, DOCX,
          </span>
        </p>
      </div>

      <aside className="flex flex-wrap mt-2">
        {thumbs}
        {isLoading && (
          <div className="flex items-center h-16 mt-2 ltr:ml-2 rtl:mr-2">
            <Spinner
              text={'Subiendo archivo'}
              simple={true}
              className="w-6 h-6"
            />
          </div>
        )}
      </aside>
    </section>
  );
}
