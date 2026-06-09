import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import API from "./Ap";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await API.get("/order/my");
            setOrders(res.data);
        } catch (err) {
            console.log(err);

            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                        Loading Orders...
                    </p>
                </div>
            </div>
        );

    if (orders.length === 0)
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col">
                <Navbar />

                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-2xl mb-4">
                        <span className="text-4xl">📦</span>
                    </div>

                    <h2 className="text-white text-2xl font-black uppercase tracking-wide">
                        No Orders Yet
                    </h2>

                    <p className="text-gray-600 text-sm mt-2 font-medium uppercase tracking-widest">
                        Start shopping to see your orders here
                    </p>
                </div>

                <Footer />
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col">
            <Navbar />

            <div className="relative flex-1 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                            My Orders
                        </h1>

                        <p className="text-gray-500 text-xs mt-1 font-bold uppercase tracking-widest">
                            {orders.length} order{orders.length !== 1 ? "s" : ""} found
                        </p>

                        <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mt-4"></div>
                    </div>

                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
                            >
                                <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500"></div>

                                <div className="flex flex-wrap justify-between items-start gap-3 px-6 py-5 border-b border-gray-800">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">
                                                Order
                                            </span>

                                            <span className="text-gray-500 text-xs font-mono bg-gray-800 px-2 py-0.5 rounded-lg">
                                                #{order._id.slice(-8).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </div>
                                    </div>

                                    <div
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border
                    ${order.status === "Delivered"
                                                ? "bg-green-500/10 border-green-500/30 text-green-400"
                                                : order.status === "Cancelled"
                                                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                                                    : "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                            }`}
                                    >
                                        {order.status}
                                    </div>
                                </div>

                                <div className="px-6 py-4 space-y-3">
                                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">
                                        Items Ordered
                                    </p>

                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center py-3 border-b border-gray-800/60 last:border-0"
                                        >
                                            <div>
                                                <p className="text-white font-bold text-sm">
                                                    {item.name}
                                                </p>

                                                <p className="text-gray-600 text-xs font-medium uppercase tracking-wider mt-0.5">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="text-orange-400 font-black text-sm">
                                                ₹ {item.price * item.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mx-6 mb-4 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                                    {order.address ? (
                                        <>
                                            <p className="text-white text-sm font-bold">
                                                {order.address.fullName}
                                            </p>

                                            <p className="text-gray-400 text-xs">
                                                📞 {order.address.phone}
                                            </p>

                                            <p className="text-gray-500 text-xs">
                                                {order.address.addressLine1}
                                            </p>

                                            {order.address.addressLine2 && (
                                                <p className="text-gray-500 text-xs">
                                                    {order.address.addressLine2}
                                                </p>
                                            )}

                                            <p className="text-gray-500 text-xs">
                                                {order.address.city}, {order.address.state} —{" "}
                                                {order.address.pincode}
                                            </p>

                                            <p className="text-gray-600 text-xs">
                                                {order.address.country}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-gray-600 text-xs italic">
                                            Address data unavailable
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between items-center px-6 py-4 bg-gray-800/30 border-t border-gray-800">
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                                        Order Total
                                    </span>

                                    <span className="text-2xl font-black text-green-400">
                                        ₹ {order.totalAmount}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}