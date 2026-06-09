import { useEffect, useState } from "react";
import API from "./Ap";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddressList({ userId: propUserId }) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);



    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetchAddresses();
    }, []);

    const handleProceedToPayment = () => {
        if (!selectedAddress) {
            alert("Select address first ❌");
            return;
        }

        navigate("/payment", {
            state: {
                product,
                addressId: selectedAddress
            }
        });
    };

    //  FETCH ADDRESSES
    const fetchAddresses = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?._id;

            if (!token) {
                navigate("/login");
                return;
            }

            const res = await API.get(`/address/${userId}`);

            setAddresses(res.data || []);
        } catch (err) {
            console.log(err);

            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }

            setError(
                err.response?.data?.message || "Failed to load addresses"
            );
        } finally {
            setLoading(false);
        }
    };

    //  DELETE ADDRESS
    const handleDelete = async (id) => {
        try {
            await API.delete(`/address/${id}`);

            alert("Deleted");
            fetchAddresses();
        } catch (err) {
            console.log(err);

            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col">
            <Navbar />

            {/* ── Ambient background ── */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-green-500 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-orange-500 rounded-full opacity-5 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 w-72 h-72 bg-emerald-600 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div
                className="fixed inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "44px 44px",
                }}
            />

            {/* ── Main content ── */}
            <div className="relative z-10 flex-1 px-4 py-12">
                <div className="max-w-2xl mx-auto space-y-5">

                    {/* ── Page title ── */}
                    <div className="mb-8">
                        <div className="h-1 w-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 rounded-t-2xl" />
                        <div className="bg-gray-900 border border-t-0 border-gray-800 rounded-b-2xl px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 flex-shrink-0">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-wide">
                                        Your Addresses
                                    </h2>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-0.5">
                                        Select a delivery address
                                    </p>
                                </div>
                            </div>

                            {/* Add Address Button */}
                            <button
                                onClick={() => navigate("/addaddress", { state: { product } })}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600
                                        hover:from-green-400 hover:to-emerald-500 active:scale-95
                                        text-white text-xs font-black uppercase tracking-widest
                                        px-4 py-2.5 rounded-xl transition-all duration-200
                                        shadow-lg shadow-green-500/30"
                            >
                                <span className="text-base leading-none">+</span>
                                Add Address
                            </button>
                        </div>
                    </div>

                    {/* ── Loading ── */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-10 h-10 border-4 border-gray-800 border-t-green-500 rounded-full animate-spin" />
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                                Loading addresses...
                            </p>
                        </div>
                    )}

                    {/* ── Error ── */}
                    {error && (
                        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl">
                            <div className="w-8 h-8 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            </div>
                            <p className="text-sm font-semibold">Error: {error}</p>
                        </div>
                    )}

                    {/* ── No addresses ── */}
                    {!loading && addresses.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4
                                        border border-dashed border-gray-700 rounded-2xl bg-gray-900/30">
                            <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-2xl
                                            flex items-center justify-center text-3xl shadow-inner">
                                📍
                            </div>
                            <div className="text-center">
                                <p className="text-white font-bold">No addresses found</p>
                                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">
                                    Add a delivery address to continue
                                </p>
                            </div>
                            <a
                                href="/addaddress"
                                className="text-green-400 hover:text-green-300 text-xs font-black uppercase tracking-widest
                                        border border-green-500/30 bg-green-500/10 hover:bg-green-500/20
                                        px-5 py-2.5 rounded-xl transition-all duration-200"
                            >
                                + Add one now
                            </a>
                        </div>
                    )}

                    {/* ── Address cards ── */}
                    {addresses.map((addr) => (
                        <div
                            key={addr._id}
                            onClick={() => setSelectedAddress(addr._id)}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-200
                                ${selectedAddress === addr._id
                                    ? "border-2 border-green-500 shadow-xl shadow-green-500/10"
                                    : "border border-gray-800 hover:border-gray-600"
                                }`}
                        >
                            {/* Dynamic top bar */}
                            <div className={`h-1 w-full transition-all duration-200
                                ${selectedAddress === addr._id
                                    ? "bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"
                                    : "bg-gray-800"
                                }`}
                            />

                            <div className={`p-5 transition-colors duration-200
                                ${selectedAddress === addr._id ? "bg-gray-800" : "bg-gray-900"}`}
                            >
                                <div className="flex items-start gap-4">

                                    {/* Radio */}
                                    <div className="mt-1 flex-shrink-0">
                                        <input
                                            type="radio"
                                            name="selectedAddress"
                                            checked={selectedAddress === addr._id}
                                            onChange={() => setSelectedAddress(addr._id)}
                                            className="w-4 h-4 accent-green-500 cursor-pointer"
                                        />
                                    </div>

                                    {/* Address info */}
                                    <div className="w-full">

                                        {/* Name + Default badge */}
                                        <div className="flex justify-between items-start gap-2 mb-1">
                                            <p className="font-black text-white text-base uppercase tracking-wide">
                                                {addr.fullName}
                                            </p>
                                            {addr.isDefault && (
                                                <span className="text-xs bg-green-500/20 border border-green-500/30
                                                                text-green-400 px-2.5 py-1 rounded-full
                                                                font-black uppercase tracking-widest flex-shrink-0">
                                                    ★ Default
                                                </span>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                            </svg>
                                            <p className="text-gray-400 text-sm">+91 {addr.phone}</p>
                                        </div>

                                        {/* Address block */}
                                        <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl px-4 py-3 mb-4 space-y-0.5">
                                            <p className="text-gray-200 text-sm font-semibold">{addr.addressLine1}</p>
                                            <p className="text-gray-500 text-xs">
                                                {addr.city}, {addr.state} — {addr.pincode}
                                            </p>
                                        </div>

                                        {/* Delete button */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // prevent selection on delete
                                                    handleDelete(addr._id);
                                                }}
                                                className="flex items-center gap-1.5
                                                        bg-red-500/10 border border-red-500/30 hover:bg-red-500/20
                                                        active:scale-95 text-red-400
                                                        text-xs font-black uppercase tracking-widest
                                                        px-4 py-2 rounded-xl transition-all duration-200"
                                            >
                                                🗑 Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* ── Place Order section ── */}
                    {addresses.length > 0 && (
                        <div className="pt-2">
                            <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 rounded-t-2xl" />
                            <div className="bg-gray-900 border border-t-0 border-gray-800 rounded-b-2xl p-5">
                                <button
                                    // onClick={handleOrder}
                                    onClick={handleProceedToPayment}
                                    disabled={!selectedAddress}
                                    className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-200
                                        ${selectedAddress
                                            ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 active:scale-95 text-white shadow-lg shadow-orange-500/30 cursor-pointer"
                                            : "bg-gray-800 text-gray-600 border border-gray-700 cursor-not-allowed"
                                        }`}
                                >
                                    {selectedAddress ? "⚡ Place Order" : "Select an address to continue"}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}