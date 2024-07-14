import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const storage = getStorage();

// export const deleteImageFile = async (path) => {
//   if (path === "") {
//     return;
//   }
//   try {
//     const desertRef = storageRef(storage, path);
//     await deleteObject(desertRef);
//   } catch (err) {
//     console.log("deleting video error:", err);
//   }
// };

export const uploadImageFile = async (path, file) => {
  if (path === "") {
    return;
  }
  try {
    const storagePath = storageRef(storage, path);
    await uploadBytes(storagePath, file);
  } catch (err) {
    console.log("updating video error:", err);
  }
};

export const fetchImageURL = async (path) => {
  if (path === "") {
    return;
  }
  try {
    const storage = getStorage();
    const url = await getDownloadURL(storageRef(storage, path));
    return url; // Return the fetched URL
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return ""; // Handle error gracefully, return empty string or handle error state
  }
};
