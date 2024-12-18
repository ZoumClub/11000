import { supabase } from "@/lib/supabase/client";

interface UploadMediaParams {
  file: File;
  carId: string;
  type: "image" | "video";
  position: number;
}

export async function uploadCarMedia({ file, carId, type, position }: UploadMediaParams) {
  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${carId}/${type}-${position}.${fileExt}`;
    const filePath = `cars/${fileName}`;

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("car-media")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("car-media")
      .getPublicUrl(filePath);

    // Insert media record
    const { error: dbError } = await supabase
      .from("dealer_car_media")
      .insert({
        car_id: carId,
        media_type: type,
        url: publicUrl,
        position
      });

    if (dbError) throw dbError;

    return { url: publicUrl };
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
}

export async function deleteCarMedia(carId: string) {
  try {
    // Get media records
    const { data: mediaRecords, error: fetchError } = await supabase
      .from("dealer_car_media")
      .select("url")
      .eq("car_id", carId);

    if (fetchError) throw fetchError;

    // Delete media records
    const { error: deleteError } = await supabase
      .from("dealer_car_media")
      .delete()
      .eq("car_id", carId);

    if (deleteError) throw deleteError;
  } catch (error) {
    console.error("Error deleting car media:", error);
    throw error;
  }
}