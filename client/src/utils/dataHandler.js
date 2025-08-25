/**
 * @param {FormData} formData
 */
export async function submitData(formData) {
    try {
        console.log(formData);
        const response = await fetch("http://localhost:5000/api/reports/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        console.log(await response.json());
    } catch (e) {

        console.error("Failure to submit data: ", e);
        
    }
}