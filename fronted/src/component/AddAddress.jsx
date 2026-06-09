import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "./Ap";

export default function AddAddress() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            await API.post("/address", form);

            alert("Address Added Successfully ✅");

            navigate("/addresslist", {
                state: { product }
            });

        } catch (err) {
            console.log(err);

            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            alert(
                err.response?.data?.message ||
                "Failed to add address"
            );
        }
    };

    const fieldConfig = {
        fullName: {
            label: "Full Name",
            placeholder: "John Doe",
            type: "text"
        },
        phone: {
            label: "Phone Number",
            placeholder: "10-digit mobile no",
            type: "tel"
        },
        addressLine1: {
            label: "Address Line 1",
            placeholder: "House / Flat / Street",
            type: "text"
        },
        addressLine2: {
            label: "Address Line 2",
            placeholder: "Landmark (optional)",
            type: "text"
        },
        city: {
            label: "City",
            placeholder: "e.g. Lucknow",
            type: "text"
        },
        state: {
            label: "State",
            placeholder: "e.g. Uttar Pradesh",
            type: "text"
        },
        pincode: {
            label: "Pincode",
            placeholder: "6-digit pincode",
            type: "text"
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-green-500 rounded-full" />
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Add New Address
                        </h2>
                    </div>

                    <p className="text-gray-400 text-sm ml-4">
                        Fill in the details for your delivery address
                    </p>
                </div>

                {/* Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {Object.keys(form).map((field) => {
                            const config = fieldConfig[field];

                            return (
                                <div
                                    key={field}
                                    className="flex flex-col gap-1.5"
                                >
                                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                        {config.label}

                                        {field !== "addressLine2" && (
                                            <span className="text-green-500 ml-1">
                                                *
                                            </span>
                                        )}
                                    </label>

                                    <input
                                        name={field}
                                        type={config.type}
                                        value={form[field]}
                                        placeholder={config.placeholder}
                                        onChange={handleChange}
                                        required={field !== "addressLine2"}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700
                                        text-white placeholder-gray-500 text-sm
                                        focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                                        hover:border-gray-600 transition-colors duration-200"
                                    />
                                </div>
                            );
                        })}

                        {/* Divider */}
                        <div className="border-t border-gray-800 pt-2" />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700
                            text-white font-semibold py-3.5 rounded-xl
                            transition-colors duration-200 tracking-wide text-sm
                            flex items-center justify-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>

                            Save Address
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}