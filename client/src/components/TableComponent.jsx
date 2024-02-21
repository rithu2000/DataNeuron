import React from "react";

// TableComponent receives data and onEditButtonClick as props
const TableComponent = ({ data, onEditButtonClick }) => {
    return (
        <div className="grow bg-darker contents">
            {/* Table with fixed layout */}
            <table className="table-fixed w-full">
                {/* Table header */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {/* Map through data to create table rows */}
                    {data.map((item, index) => (
                        <tr className="text-center" key={index}>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            {/* Action column with an Edit button */}
                            <td>
                                {/* Edit button with an onClick event handler */}
                                <button onClick={() => { onEditButtonClick(item) }} className="px-6 py-2 mr-2 bg-blue-500 text-white rounded">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;