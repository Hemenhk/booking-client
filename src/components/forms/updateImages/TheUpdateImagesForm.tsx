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
import { useState } from "react";
import { updateStoreImages } from "@/axios/stores";

// Update schema to accept multiple images
const formSchema = z.object({
  collageImages: z
    .array(z.instanceof(File))
    .nonempty("At least one image is required"),
});

type Data = {
  collageImages: File[];
};

type Props = {
  storeId: string;
};

export default function TheUpdateImagesForm({ storeId }: Props) {
  const { toast, dismiss } = useToast();
  const queryClient = useQueryClient();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collageImages: [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      form.setValue("collageImages", files);
      const previews = files.map((file) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          setImagePreviews((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
        return URL.createObjectURL(file); // For immediate display
      });
      setImagePreviews(previews);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: Data) => updateStoreImages(storeId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["store"], data);
      queryClient.refetchQueries({ queryKey: ["store"] });
      queryClient.refetchQueries({ queryKey: ["single-store"] });
      toast({
        title: `Dina bilder uppdaterades`,
      });
      setImagePreviews([]); // Reset image previews after upload
      dismiss();
    },
    onError: (error) => {
      console.error("Error updating store images:", error);
      toast({
        title: "Något gick fel",
        description: "Försök igen senare.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      // Append each collage image to FormData
      values.collageImages.forEach((file) => {
        formData.append("collageImages", file);
      });
      await mutateAsync(formData); // Pass FormData to the mutation
    } catch (error) {
      console.error("Error updating store images:", error);
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
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Image Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
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
