import { useEffect, useState } from "react";
import { ReportValidationModal } from "./ReportValidationModal";
import { ViewImagesModal } from "./ViewImagesModal";

export function ReportList() {
    const [reports, setReports] = useState([]);
    const [validateReportModal, setValidateReportModal] = useState(null);
    const [viewImagesModal, setViewImagesModal] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/reports/")
        .then((res) => res.json())
        .then((data) => setReports(data))
        .catch((err) => {
            console.error("Failed to fetch reports: ", err);
            setReports([]);
        });
    }, []);
    
    return (
        <>
            <h2 className="text-xl font-bold m-2 bg-gray-50 text-center">
                User Reports
            </h2>
            <div className="flex justify-center items-start">
                <div className="overflow-x-scroll w-full">
                    <table>
                        <thead>
                            <tr className="bg-gray-100">
                                <th>ID</th>
                                <th>Status</th>
                                <th>Creation Date</th>
                                <th>Expiration Date</th>
                                <th>Lat</th>
                                <th>Long</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Images</th>
                                <th></th>
                                <th>Validated By</th>
                                <th>Validated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-t bg-gray-50">
                                    <td>{report.id}</td>
                                    <td>{report.status || "-"}</td>
                                    <td>{report.created_at ? new Date(report.created_at).toLocaleString() : "-"}</td>
                                    <td>{report.expiration_date ? new Date(report.expiration_date).toLocaleDateString() : "-"}</td>
                                    <td>{report.latitude}</td>
                                    <td>{report.longitude}</td>
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
                                    <td>{report.validated_by || "-"}</td>
                                    <td>{report.validated_at ? new Date(report.validated_at).toLocaleString() : "-"}</td>
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