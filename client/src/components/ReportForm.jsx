import { useState } from "react";
import {submitData} from "../utils/dataHandler";

export function ReportForm({onClose, coordinates}) {

    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("pollution");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
    "email": email,
    "category": category,
    "description": description,
    "latitude": coordinates[0],
    "longitude": coordinates[1]
    }
    //images.forEach((img) => formData.append("images", img));
    submitData(data);

    onClose();
}

    return (
        <>
    <div className="overlay">
      <div className="modal">
        <p className="underline text-2xl mb-3.5 text-center">Report Form</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col">E-Mail:
                <input
                className="border"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
                /> 
            </label>
            <label className="flex flex-col">Category: 
                <select
                className="border"
                name="category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required>
                    <option value="Pollution">Pollution</option>
                    <option value="Illegal Construction">Illegal Construction</option>
                    <option value="Land Clearing">Land Clearing</option>
                    <option value="Blocked Access">Blocked Access</option>
                </select>
            </label>
            <label className="flex flex-col">Description:
                <input
                className="border"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label>
            <label className="flex flex-col">Upload Images:
                <input
                    className="border"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    />
            </label>
            <div className="flex flex-wrap gap-2">
                {Array.from(images).map((img, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">{img.name}</span>
                ))}
            </div>
            <div className="flex justify-between gap-2">
              <button onClick={onClose}>Close</button>
              <button className="bg-cyan-500 border-cyan-500 rounded-sm  hover:bg-blue-700 " type="submit">Submit</button>
            </div>
        </form>
      </div>
    </div>
        </>
    );
};