import { useState } from "react";
import { useGlobalContext } from "../../Context/Context";
import { storage } from "../../Firebase/FirebaseInit";
import { auth } from "../../Firebase/FirebaseInit";
import Img from "../../assets/dp.jpg"
import "./Profile.css"

const Profile = ({user})=>{
  function ProfilePictureUpload() {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage(file);
    };
  
    const handleImageUpload = () => {
      if (image) {
        const storageRef = storage.ref(`profilePictures/${auth.currentUser.uid}`);
        const uploadTask = storageRef.put(image);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Get the upload progress
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
          },
          (error) => {
            // Handle errors during upload
            console.error('Error uploading image:', error);
          },
          () => {
            // Upload completed successfully
            storageRef.getDownloadURL().then((url) => {
              // Update the user's profile picture URL
              auth.currentUser.updateProfile({
                photoURL: url,
              }).then(() => {
                console.log('Profile picture URL updated successfully!');
              }).catch((error) => {
                console.error('Error updating profile picture URL:', error);
              });
            });
          }
        );
      }
    };
  
    return (
      <div className="profile">
        <p>{user.displayName}</p>
        <label htmlFor="file"> choose file
        <input className="profile_img_input" type="file" id="file" name="file" onChange={handleImageChange} />
        </label>
        <button onClick={handleImageUpload}>Upload Profile Picture</button>
      <div className="profile_img_container">
      <img src={user.photoURL} alt="profile_pic" />
      </div>
      </div>
    );
  }
    return (
        <>
         {user && (
        <>
        <ProfilePictureUpload />

        </>
      )}
        </>
    );
}
export default Profile;


