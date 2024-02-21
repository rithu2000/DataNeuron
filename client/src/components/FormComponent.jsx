import React from "react";

const FormComponent = ({ formData, onFormChange, onSubmit }) => {
    // Handle input changes and update form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the form data and notify the parent component
        onFormChange({ ...formData, [name]: value });
    };
    const handleSubmit = () => {
        // Handle form submission using the onSubmit prop
        onSubmit(formData);
    };

    return (
        <div className="shrink-0 contents">
            <form>
                {/* Name Input */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-white">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded bg-darker text-white"
                    />
                </div>
                {/* Age Input */}
                <div className="mb-4">
                    <label htmlFor="age" className="block text-white">
                        Age:
                    </label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded bg-darker text-white"
                    />
                </div>
                {/* Hidden ID Input */}
                <input
                    type="hidden"
                    name="id"
                    value={formData.id || ""}
                />
                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
                >
                    {/* Display "Update" if form has an ID, otherwise "Add" */}
                    {formData.id ? "Update" : "Add"}
                </button>
            </form>
        </div>
    );
};

export default FormComponent;