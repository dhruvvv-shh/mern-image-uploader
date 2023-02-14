import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useState, useRef } from "react"
import "./styles.modules.css";
import { FiImage } from "react-icons/fi"



const ImageUploader = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const fileInput = useRef(null)


  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'bjeqamut')
    console.log('image', image)
    let url = 'https://api.cloudinary.com/v1_1/dvt51l99m/image/upload'
    const id = toast.loading("Uploading Images", { position: toast.POSITION.TOP_CENTER });
    try {
     
      let response = await axios.post(url, data);

      let imageData = {
        'email': localStorage.getItem("email"),
        'url': response.data.secure_url,
        'title': title,
        'desc': description,
        'viewcount': 0
      };

      await axios.post('https://image-mern-uploader.onrender.com/api/image/add', imageData);
       toast.update(id,{render: "Image Added Succesfully", type:toast.TYPE.SUCCESS, isLoading:false , autoClose:3000})
      // toast.update({render: "Image Added Succesfully", type:toast.TYPE.SUCCESS});
      setTimeout(() => { window.location.reload() }, 3000);

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        
        setTimeout(() => toast.update(id, { render: error.response.data.message, type: toast.TYPE.ERROR, isLoading: false , autoClose: 3000}) , 2000)
      
        }

    }
  }

  return (
    <div className='image_container'>
      <div className='image_submit'>
        <h1 style={{ "display": "inline-flex" }}> <FiImage style={{ "margin-top": "5px", "color": "#3bb19b", "margin-right": "10px" }} /> Upload Image </h1>
        <div>
          <h3>Title</h3>
          <input type='text' placeholder="Image Title" value={title} onChange={(e) => setTitle(e.target.value)} className='input'></input>
          <h3>Description  </h3>
          <input type='text' placeholder="Image Description" value={description} onChange={(e) => setDescription(e.target.value)} className='input'></input>


          <input type='file' ref={fileInput} name="image" onChange={(e) => setImage(e.target.files[0])} required style={{ "display": "none" }} />
        </div>
        <div style={{ "display": "inline-flex", "margin-top": "5%" }}>
          <button
            className='green_btn'
            onClick={() => fileInput.current.click()}
          >Choose File</button>


          <button type="button" onClick={handleSubmit} className="green_btn">Submit  </button>
        </div>
        <div className='file_name'>
          {image && <div style={{ "text-color": " #edf5f3" }}>Added File : {image.name}</div>}
        </div>

      </div>
    </div>
  )

}

export default ImageUploader