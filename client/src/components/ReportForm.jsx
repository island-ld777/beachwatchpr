import { useState } from "react";

export function ReportForm({onClose}) {
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("pollution");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("category", category);
    formData.append("description", description);
    images.forEach((img) => formData.append("images", img));
    //SEND TO BACK END LINE GOES HERE
    console.log([email, category, description, images]);
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
                autocomplete="off"
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
                    <option value="pollution">Pollution</option>
                    <option value="illegal_construction">Illegal Construction</option>
                    <option value="land_clearing">Land Clearing</option>
                    <option value="blocked_access">Blocked Access</option>
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