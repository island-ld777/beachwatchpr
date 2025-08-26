import { useEffect, useState } from "react";
import { ReportValidationModal } from "./ReportValidationModal";
import { ViewImagesModal } from "./ViewImagesModal";

export function ReportList() {
    const [reports, setReports] = useState([]);
    const [validateReportModal, setValidateReportModal] = useState(null);
    const [viewImagesModal, setViewImagesModal] = useState(null);

    const fetchReports = () => {
        fetch("http://localhost:5000/api/reports/")
        .then((res) => res.json())
        .then((data) => setReports(data))
        .catch((err) => {
            console.error("Failed to fetch reports: ", err);
            setReports([]);
        });
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleReportUpdated = (updatedReport) => {
        setReports(prevReports => 
            prevReports.map(report => 
                report.id === updatedReport.id ? updatedReport : report
            )
        );
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'validated': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

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
                                <th>Actions</th>
                                <th>Validated By</th>
                                <th>Validated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-t bg-gray-50">
                                    <td>{report.id}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(report.status)}`}>
                                            {report.status || 'pending'}
                                        </span>
                                    </td>
                                    <td>{report.created_at ? new Date(report.created_at).toLocaleString() : "-"}</td>
                                    <td>{report.expiration_date ? new Date(report.expiration_date).toLocaleDateString() : "-"}</td>
                                    <td>{report.latitude}</td>
                                    <td>{report.longitude}</td>
                                    <td>{report.email}</td>
                                    <td>{report.category}</td>
                                    <td className="max-w-xs truncate">{report.description}</td>
                                    <td>
                                        <button
                                            className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm"
                                            onClick={() => setViewImagesModal(report)}
                                        >
                                            View Images ({report.images?.length || 0})
                                        </button>
                                    </td>
                                    <td>
                                        {(report.status === 'pending' || !report.status) ? (
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                                onClick={() => setValidateReportModal(report)}
                                            >
                                                Validate
                                            </button>
                                        ) : (
                                            <span className="text-gray-500 text-sm">
                                                {report.status === 'validated' ? 'Validated' : 'Rejected'}
                                            </span>
                                        )}
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
                onReportUpdated={handleReportUpdated}
            />
        </>
    );
}