// frontend/pages/departments/index.js
import React, { useEffect, useState } from 'react';
import { getDepartments, getFacultyChoices, createDepartment, updateDepartment, deleteDepartment } from '@/utils/axiosAcademic';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [facultyChoices, setFacultyChoices] = useState([]);
    const [editId, setEditId] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null); // State for selected department


    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Fetch departments and faculty choices
    useEffect(() => {
        fetchDepartments();
        fetchFacultyChoices();
    }, []);

    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            toast.error('Failed to fetch departments.');
        }
    };

    const fetchFacultyChoices = async () => {
        try {
            const data = await getFacultyChoices();
            setFacultyChoices(data);
        } catch (error) {
            toast.error('Failed to fetch faculty choices.');
        }
    };

    // Create or update department
    const onSubmit = async (data) => {
        try {
            if (editId) {
                await updateDepartment(editId, data);
                toast.success('Department updated successfully.');
            } else {
                await createDepartment(data);
                toast.success('Department created successfully.');
            }
            reset();
            setEditId(null);
            fetchDepartments();
        } catch (error) {
            toast.error(editId ? 'Failed to update department. Logged In?' : 'Failed to create department.  Logged In?');
        }
    };

    // Edit department
    const handleEdit = (department) => {
        setEditId(department.id);
        setValue('name', department.name);
        setValue('faculty', department.faculty);
    };

    // Delete department
    const handleDelete = async (id) => {
        try {
            await deleteDepartment(id);
            toast.success('Department deleted successfully.');
            fetchDepartments();
        } catch (error) {
            toast.error('Failed to delete department. Logged In?');
        }
    };

    // Display department details
    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    // Close department details
    const closeDepartmentDetails = () => {
        setSelectedDepartment(null);
    };

    return (
        <div className="container mx-auto p-2">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#800000]">Departments</h1>

            {/* Department Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4 p-3 bg-white rounded-lg ">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Department Name
                    </label>
                    <input
                        {...register('name', { required: 'Department name is required' })}
                        type="text"
                        placeholder="Department Name"
                        className={`border border-gray-700 rounded-md w-full py-2 px-3 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="faculty">
                        Faculty
                    </label>
                    <select
                        {...register('faculty', { required: 'Faculty is required' })}
                        className={`border border-gray-700 rounded-md w-full py-3 px-3 ${errors.faculty ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select Faculty</option>
                        {facultyChoices.map(choice => (
                            <option key={choice.value} value={choice.value}>
                                {choice.label}
                            </option>
                        ))}
                    </select>
                    {errors.faculty && <p className="text-red-500 text-xs italic">{errors.faculty.message}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {editId ? 'Update' : 'Create'}
                </button>
                <div class=" mx-auto border-b p-2 my-4 border-[#800000]"></div>  {/* Horizontal line */}
            </form>
           
            {/* Department List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-green-400 rounded-lg shadow-md">
                    <thead className="bg-[#800000] border border-green-400 text-white">
                        <tr>
                            <th className="py-2 px-4 border border-green-400 text-left">Name</th>
                            <th className="py-2 px-4 border border-green-400 text-left">Faculty</th>
                            <th className="py-2 px-4 border border-green-400 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dept => (
                            <tr key={dept.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b cursor-pointer border border-green-400 text-blue-800" onClick={() => handleDepartmentClick(dept)}>
                                    {dept.name} {/* clickable department name */}
                                </td>
                                <td className="py-2 px-4  border border-green-400">{dept.faculty}</td>
                                <td className="py-2 px-4  border border-green-400 text-center">
                                    <button
                                        onClick={() => handleEdit(dept)}
                                        className="bg-green-400 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(dept.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Department Details Overlay */}
            {selectedDepartment && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 rounded-lg shadow-lg p-6 w-96 z-50">
                    <h2 className="text-xl font-semibold mb-4">{selectedDepartment.name} Details</h2>
                    <p><strong>Faculty:</strong> {selectedDepartment.faculty}</p>
                    {/* Add more details as needed */}
                    <button
                        onClick={closeDepartmentDetails}
                        className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            )} 
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}