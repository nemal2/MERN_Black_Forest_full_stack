import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: inputs.price,
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Case</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Case</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Date</label>
              <input id="price" name="price" type="date" />
            </div>
            <div className="item">
              <label htmlFor="address">Country</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Case Summary</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Deaths</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Injuries</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Priority</label>
              <select name="type">
                <option value="Red_Alert" defaultChecked>
                  Red Alert
                </option>
                <option value="Orange_Alert">Orange Alert</option>
                <option value="Blue_Alert">Blue Alert</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Mission Type</label>
              <select name="property">
                <option value="Global_Terrorism">Global Terrorism</option>
                <option value="Regional">Regional</option>
                <option value="Political">Political</option>
                <option value="Black_Market">Black Market</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Last Update</label>
              <select name="utilities">
                <option value="initiated">Case Initiated</option>
                <option value="searching">Searching Process</option>
                <option value="caught_criminals">Criminals Identified</option>
                <option value="confirmation">Confiramtion Process</option>
                <option value="handed_to_court">Finalized</option>
              </select>
            </div>
            {/* <div className="item">
              <label htmlFor="pet">Main Accused</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div> */}
            <div className="item">
              <label htmlFor="pet">Main Accused</label>
              <input id="pet" name="pet" type="text" />
            </div>

            <div className="item">
              <label htmlFor="income">Main Targets</label>
              <input id="income" name="income" type="text" placeholder="Plan" />
            </div>
            <div className="item">
              <label htmlFor="size">Damage Rate (%)</label>
              <input min={0} max={100} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">Cyber Rate (%)</label>
              <input
                min={0}
                max={100}
                id="school"
                name="school"
                type="number"
              />
            </div>
            <div className="item">
              <label htmlFor="bus">Explosive Rate (%)</label>
              <input min={0} max={100} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Bio Rate (%)</label>
              <input
                min={0}
                max={100}
                id="restaurant"
                name="restaurant"
                type="number"
              />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "nemal2",
            uploadPreset: "blackforest",
            folder: "post",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;

