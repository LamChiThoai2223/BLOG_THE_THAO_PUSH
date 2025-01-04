
import { storage } from '../../config/FireBase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Hàm upload file
export const uploadFileBlog = async (file) => {
    if (!file) return null;
  
    const storageRef = ref(storage, `uploads/blogs/${file.name}`);
  
    // Upload file
    await uploadBytes(storageRef, file);
  
    // Lấy URL của file
    const url = await getDownloadURL(storageRef);
    return url;
  };

  export const uploadFileUser = async (file) => {
    if (!file) return null;

    const storageRef = ref(storage, `uploads/Users/${file.name}`);

    // Upload file
    await uploadBytes(storageRef, file);

    // Lấy URL của file
    const url = await getDownloadURL(storageRef);
    return url;
  };
  export const uploadFileComment = async (file) => {
    if (!file) return null;
  
    const storageRef = ref(storage, `uploads/Comments/${file.name}`);
  
    // Upload file
    await uploadBytes(storageRef, file);
  
    // Lấy URL của file
    const url = await getDownloadURL(storageRef);
    return url;
  };


  export const uploadFilesToFirebase = async (files) => {
    const uploadPromises = files.map(file => {
        const storageRef = ref(storage, `uploads/sports/${file.name}`);
        return uploadBytes(storageRef, file)
            .then(snapshot => getDownloadURL(snapshot.ref))
            .catch(error => {
                console.error('Upload failed:', error);
                return null;
            });
    });

    const urls = await Promise.all(uploadPromises);
    return urls.filter(url => url !== null);
};
