import React, { useEffect, useState } from "react";
import Splitter from "./Splitter";
import { useResizable } from "react-resizable-layout";
import { cn } from "../utils/cn";
import TableComponent from "./TableComponent";
import FormComponent from "./FormComponent";
import { addData, getData, updateData } from "../api/Apis";

const ResizableComponent = () => {
    // State variables for table data, count, and form data
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState([]);
    const [formData, setFormData] = useState({ id: "", name: "", age: "", count: "" });

    // Hooks for resizable components
    const {
        isDragging: isTerminalDragging,
        position: terminalH,
        splitterProps: terminalDragBarProps
    } = useResizable({
        axis: "y",
        initial: 300,
        min: 250,
        reverse: true
    });
    const {
        isDragging: isPluginDragging,
        position: pluginW,
        splitterProps: pluginDragBarProps
    } = useResizable({
        axis: "x",
        initial: 500,
        min: 250,
        reverse: true
    });

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await getData();
            if (response.success) {
                setTableData(response.data);
                setCount(response.addUpdateCount)
            } else {
                console.error("Error fetching data:", response.error);
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle form submission (add/update data)
    const handleSubmit = async (formData) => {
        try {
            if (formData.id) {
                // If formData has an 'id', it's an existing item, so update
                await updateData(formData);
                setTableData(prevData =>
                    prevData.map(item => (item._id === formData.id ? formData : item))
                );
                setFormData({ id: "", name: "", age: "" });
                setCount(count + 1);
            } else {
                // If formData doesn't have an 'id', it's a new item, so add
                await addData(formData);
                setTableData([...tableData, formData]);
                setFormData({ id: "", name: "", age: "" });
                setCount(count + 1);
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    };

    // Function to handle edit button click (populate form for editing)
    const handleEditButtonClick = (item) => {
        setFormData({ id: item._id, name: item.name, age: item.age });
    };
    const handleFormChange = (updatedFormData) => {
        setFormData(updatedFormData);
    };

    // JSX structure for the resizable layout
    return (
        <div className={"flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"}>
            <div className={"flex grow"}>
                <div className={"grow bg-darker contents"}>
                    DataNeuron
                    <h1>Api Call Count = {count}</h1>
                </div>
                <Splitter
                    isDragging={isPluginDragging}
                    {...pluginDragBarProps}
                />
                <div
                    className={cn("shrink-0 contents", isPluginDragging && "dragging")}
                    style={{ width: pluginW }}
                >
                    <FormComponent formData={formData} onFormChange={handleFormChange} onSubmit={handleSubmit} />
                </div>
            </div>
            <Splitter
                dir={"horizontal"}
                isDragging={isTerminalDragging}
                {...terminalDragBarProps}
            />
            <div
                className={cn(
                    "shrink-0 bg-darker contents",
                    isTerminalDragging && "dragging"
                )}
                style={{ height: terminalH }}
            >
                <TableComponent data={tableData} onEditButtonClick={handleEditButtonClick} />
            </div>
        </div>
    );
};

export default ResizableComponent;