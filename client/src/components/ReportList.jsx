import { useState } from "react";
import { ReportValidationModal } from "./ReportValidationModal";
import { ViewImagesModal } from "./ViewImagesModal";

export function ReportList() {
    const [validateReportModal, setValidateReportModal] = useState(null);
    const [viewImagesModal, setViewImagesModal] = useState(null);

    /*
    NOTE: This is placeholder data before backend will be implemented.
    */
    const reports = [
        {
            id: 1,
            lat: 18.48,
            lon: -66.43,
            email: "johnsmith@gmail.com",
            category: "Pollution",
            description: "Saw pickup trucks dump trash on the coast.",
            images: ["https://placehold.co/600x400/orange/white", "https://placehold.co/600x400/red/white"]
        },
        {
            id: 2,
            lat: 18.47,
            lon: -66.25,
            email: "johnsmith@gmail.com",
            category: "Blocked Access",
            description: "Government signs negating access to the area.",
            images: ["https://placehold.co/600x400/green/white"]
        },
    ];

    return (
        <>
            <h2 className="text-xl font-bold m-2 bg-gray-50 text-center">
                User Reports
            </h2>
            <div className="flex justify-center items-start">
                <div className="overflow-x-scroll w-full max-w-4xl">
                    <table>
                        <thead>
                            <tr className="bg-gray-100">
                                <th>ID</th>
                                <th>Lat</th>
                                <th>Long</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Images</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-t bg-gray-50">
                                    <td>{report.id}</td>
                                    <td>{report.lat}</td>
                                    <td>{report.lon}</td>
                                    <td>{report.email}</td>
                                    <td>{report.category}</td>
                                    <td>{report.description}</td>
                                    <td>
                                        <button
                                            className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                                            onClick={() => setViewImagesModal(report)}
                                        >
                                            View Images
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => setValidateReportModal(report)}
                                        >
                                            Validate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ViewImagesModal
                report={viewImagesModal}
                onClose={() => setViewImagesModal(null)}
            />

            <ReportValidationModal
                report={validateReportModal}
                onClose={() => setValidateReportModal(null)}
            />


        </>
    );
}