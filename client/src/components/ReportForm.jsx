import { useState } from "react";
import { submitData } from "../utils/dataHandler";

export function ReportForm({ onClose, coordinates }) {
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("Pollution");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                email: email,
                category: category,
                description: description,
                latitude: coordinates[0],
                longitude: coordinates[1],
                images: images
            };
            
            await submitData(data);
            alert('Report submitted successfully!');
            onClose();
        } catch (error) {
            alert('Failed to submit report. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            <textarea
                                className="border min-h-20"
                                name="description"
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
                            <small className="text-gray-500">Max 5 images, 5MB each</small>
                        </label>
                        
                        {images.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">Selected Images:</p>
                                <div className="flex flex-wrap gap-2">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                                            <span className="mr-2">{img.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="flex justify-between gap-2">
                            <button type="button" onClick={onClose} disabled={isSubmitting}>
                                Close
                            </button>
                            <button 
                                className="bg-cyan-500 border-cyan-500 rounded-sm hover:bg-blue-700 disabled:opacity-50" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}