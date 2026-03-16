"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface Props {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: Props) => {
  const { pending } = useFormStatus();

  const images = defaultImages;
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              readOnly
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              sizes="(max-width: 768px) 33vw, 100px"
              src={image.urls.thumb}
              alt="unsplash image"
              className="object-cover rounded-sm"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};
