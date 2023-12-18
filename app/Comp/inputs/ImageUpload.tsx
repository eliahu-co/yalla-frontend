"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { MdAddAPhoto } from "react-icons/md";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="bawa7kmx"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        console.log(open)
        return (
          <div
            onClick={open ? () => open() : undefined}
            className="
                relative
                cursor-pointer
                hover:border-black
                hover:text-black
                transition
                border-dashed
                border-2
                p-20
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-400
                "
          >
            <MdAddAPhoto size={40} />
            <div
              className="
                      text-lg 
                      font-semibold
                      "
            >
              Click to upload
            </div>

            {value && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="House"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
