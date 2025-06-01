import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

    const { authUser, upDateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(authUser?.fullName || "");

  const [bio, setBio] = useState(authUser?.bio || "");
  const [profilePic, setProfilePic] = useState( null);



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!profilePic) {
      await upDateProfile({ fullName, bio });
      navigate("/");
      return;
    }
    //converting image to base64
    const reader = new FileReader();
    reader.readAsDataURL(profilePic)
    reader.onloadend = async ()=>{
      const base64Image = reader.result
      await upDateProfile({fullName,bio,profilePic:base64Image})
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="border-2 border-gray-200 p-6 rounded-lg text-white flex items-center justify-between gap-10 backdrop-blur-2xl max-sm:flex-col-reverse ">
        <div className="w-full">
          <h1 className="font-semibold text-xl">Profile Details</h1>
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            action=""
            className="flex flex-col mt-3 gap-4"
          >
            <label
              htmlFor="avatar"
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                onChange={(e) => setProfilePic(e.target.files[0])}
                accept="image/jpeg, image/png"
                type="file"
                hidden
                id="avatar"
              />
              <img
                src={
                  profilePic
                    ? URL.createObjectURL(profilePic)
                    : assets.avatar_icon
                }
                alt=""
                className="h-12 w-12 rounded-full "
              />
              <p className="font-light text-sm">Upload Your Profile Picture</p>
            </label>
            <input
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              className="p-2 border rounded-lg placeholder:text-gray-300 text-gray-300 outline-none focus:outline-none focus:border-none focus:ring-2 focus:ring-violet-400"
              type="text"
              placeholder="Enter Fullname"
            />
            <textarea
              value={bio}
              required
              onChange={(e) => setBio(e.target.value)}
              name=""
              rows={4}
              id=""
              placeholder="Edit your bio...."
              className="p-2 border rounded-lg placeholder:text-gray-300 text-gray-300 outline-none focus:outline-none focus:border-none focus:ring-2 focus:ring-violet-400"
            ></textarea>
            <button
              className="w-full bg-gradient-to-r from-violet-500 to-blue-500 py-2 rounded-lg cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
        <img src={authUser?.profilePic || assets.logo_icon} className={`max-w-44 aspect-square ${authUser?.profilePic && 'rounded-full'}`} alt="" />
      </div>
    </div>
  );
};

export default Profile;
