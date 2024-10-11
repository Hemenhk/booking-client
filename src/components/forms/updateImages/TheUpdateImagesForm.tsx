"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { updateStoreImages } from "@/axios/stores";

// Update schema to accept multiple images
const formSchema = z.object({
  collageImages: z.array(z.instanceof(File)).optional(),
});

type Data = {
  collageImages?: File[];
};

type Props = {
  storeId: string;
  existingImages: string[]; // Pass the existing image URLs
};

export default function TheUpdateImagesForm({
  storeId,
  existingImages,
}: Props) {
  const { toast, dismiss } = useToast();
  const queryClient = useQueryClient();

  // State to manage image previews and deleted images
  const [imagePreviews, setImagePreviews] = useState<string[]>(existingImages);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collageImages: [],
    },
  });

  // Handle image selection and preview generation
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      form.setValue("collageImages", files);
      const newPreviews = files.map((file) => URL.createObjectURL(file)); // Create immediate previews
      setImagePreviews((prev) => [...prev, ...newPreviews]); // Append new previews to the existing ones
    }
  };

  // Handle image deletion
  const handleImageDelete = (index: number) => {
    const imageToDelete = imagePreviews[index];

    // If the image is an existing image (not a new one), add it to the deletedImages array
    if (existingImages.includes(imageToDelete)) {
      setDeletedImages((prev) => [...prev, imageToDelete]);
    }

    // Remove the image from the preview list
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: FormData) => updateStoreImages(storeId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["store"], data);
      queryClient.refetchQueries({ queryKey: ["store"] });
      queryClient.refetchQueries({ queryKey: ["single-store"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      // Append only the remaining existing images that haven't been deleted
      imagePreviews.forEach((imageUrl) => {
        if (existingImages.includes(imageUrl)) {
          formData.append("existingImages[]", imageUrl); // Ensure the imageUrl is appended as a single string
        }
      });
      // Append each collage image (new images) to FormData
      values.collageImages?.forEach((file) => {
        formData.append("collageImages", file);
      });

      // Append the deleted images
      deletedImages.forEach((imageUrl) => {
        formData.append("deletedImages", imageUrl);
      });

      await mutateAsync(formData); // Pass FormData to the mutation
      toast({
        title: `Dina bilder uppdaterades`,
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
    } catch (error) {
      console.error("Error updating store images:", error);
      toast({
        title: "Något gick fel",
        description: "Försök igen senare.",
        variant: "destructive",
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
    }
  };

  return (
    <Form {...form}>
      <DialogContent className="overflow-hidden max-w-[600px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ändra Bilder
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Fyll i fälten för att ändra dina bilder
            </p>
          </DialogHeader>

          <FormItem>
            {/* Display previews of both existing and new images */}
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative group">
                  <img
                    src={src}
                    alt={`Image Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  {/* Delete button */}
                  <Button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute flex items-center justify-center p-1 -top-2 -right-2 size-6 text-neutral-500 border border-neutral-200 bg-white hover:bg-neutral-200 ease-out duration-300 rounded-full transition"
                  >
                    x
                  </Button>
                </div>
              ))}
            </div>

            <Input
              type="file"
              className="h-9 cursor-pointer w-1/3"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <FormMessage />
          </FormItem>

          <DialogFooter className="px-6 py-4">
            <Button type="submit" className="font-normal">
              Spara
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
