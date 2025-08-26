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