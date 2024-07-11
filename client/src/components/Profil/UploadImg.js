// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { uploadPicture } from "../../actions/user.actions";

// const UploadImg = () => {
//   const [file, setFile] = useState();
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.userReducer);

//   const handlePicture = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("name", userData.pseudo);
//     data.append("userId", userData._id);
//     data.append("file", file);

//     dispatch(uploadPicture(data, userData._id));
//   };

//   return (
//     <form action="" onSubmit={handlePicture} className="upload-pic">
//       <label htmlFor="file">Changer ma photo</label>
//       <input
//         type="file"
//         id="file"
//         name="file"
//         accept=".jpg, .jpeg, .png"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <br />
//       <input type="submit" value="Envoyer" name="" id="" />
//     </form>
//   );
// };

// export default UploadImg;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
    const [file, setFile] = useState(null); // Initialize with null
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        if (file) { // Ensure there is a file selected
            const data = new FormData();
            data.append("name", userData.pseudo);
            data.append("userId", userData._id);
            data.append("file", file);

            dispatch(uploadPicture(data, userData._id));
        } else {
            console.log("No file selected.");
        }
    };

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer ma photo</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default UploadImg;
