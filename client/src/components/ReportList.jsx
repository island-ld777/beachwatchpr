export function ReportList() {
    return (
        <div className="bg-gray-50 flex justify-center items-start min-h-screen">
            <h2 className="text-xl font-bold m-2">User Reports</h2>
            <div className="overflow-x-auto ">
            <table>
                <thead>
                    <tr className="bg-gray-100">
                        <th>ID</th>
                        <th>Lat</th>
                        <th>Long</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t hover:bg-gray-50">
                        <td>1</td>
                        <td>18.48</td>
                        <td>-66.43</td>
                        <td>johnsmith@gmail.com</td>
                        <td>Pollution</td>
                        <td>Saw pickup trucks dump trash on the coast.</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}