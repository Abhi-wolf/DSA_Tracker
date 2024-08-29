import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (file) => {
  try {
    const folder = "blocknote";
    // const filename = Math.round(Math.random() * 10000000);

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB limit

    if (file.size > maxSizeInBytes) {
      throw new Error("File size exceeds the 5 MB limit.");
    }

    const filename = uuidv4();
    const storageRef = ref(
      storage,
      `${folder}${filename}.${file.name.split(".").pop()}`
    );

    const res = await uploadBytes(storageRef, file);

    const path = res.metadata.fullPath;

    if (!path) {
      throw new Error("No path found");
    }

    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw new Error(error?.message);
  }
};
