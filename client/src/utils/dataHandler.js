/**
 * @param {Object} data
 */
export async function submitData(data) {
    try {
        const formData = new FormData();

        formData.append('email', data.email);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);

        if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
                formData.append('images', image);
            })
        }
        
        console.log('Submitting form data:', formData);

        const response = await fetch("http://localhost:5000/api/reports/", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Submission successful:', result);
        return result;

    } catch (e) {
        console.error("Failure to submit data: ", e);
        throw e;
    }
}

/**
 * Validate or reject a report
 * @param {number} reportId - The ID of the report to validate
 * @param {string} status - Either 'validated' or 'rejected'
 */
export async function validateReport(reportId, status) {
    try {
        if (!['validated', 'rejected'].includes(status)) {
            throw new Error('Invalid status. Must be "validated" or "rejected"');
        }

        const response = await fetch(`http://localhost:5000/api/reports/${reportId}/validate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(`Report ${status}:`, result);
        return result;

    } catch (error) {
        console.error(`Error ${status === 'validated' ? 'validating' : 'rejecting'} report:`, error);
        throw error;
    }
}

export async function getValidatedReports() {
    try {
        const response = await fetch("http://localhost:5000/api/reports");

        if (!response.ok){
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const reports = await response.json();
        return reports.filter(report => report.status === 'validated');
    } catch (error) {
        console.error('Error fetching validated reports:', error);
        throw error;
    }
}