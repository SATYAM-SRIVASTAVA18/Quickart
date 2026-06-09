import { useEffect, useState } from "react";
import API from "../component/Ap";
import Navadmin from "./Navadmin";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await API.get("/order/admin/all");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await API.put(`/order/admin/status/${orderId}`, { status: newStatus });
            fetchOrders();
        } catch (err) {
            console.log(err);
        }
    };

    const statusColor = (status) => {
        if (status === "Delivered") return "text-green-400 bg-green-500/10 border-green-500/30";
        if (status === "Shipped") return "text-blue-400 bg-blue-500/10 border-blue-500/30";
        return "text-orange-400 bg-orange-500/10 border-orange-500/30";
    };

    const statusDot = (status) => {
        if (status === "Delivered") return "bg-green-400";
        if (status === "Shipped") return "bg-blue-400";
        return "bg-orange-400";
    };

    // Summary stats
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const pending = orders.filter(o => o.status === "Pending").length;
    const shipped = orders.filter(o => o.status === "Shipped").length;
    const delivered = orders.filter(o => o.status === "Delivered").length;

    return (
        <div className="min-h-screen bg-gray-950">
        <Navadmin />
        <div className="relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600 rounded-full opacity-5 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-500 rounded-full opacity-5 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            ></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">

                {/* Page Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase">Orders Dashboard</h1>
                    <p className="text-gray-500 text-xs mt-1 font-bold uppercase tracking-widest">Admin Control Panel</p>
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mt-4"></div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black text-white">{orders.length}</p>
                        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Total Orders</p>
                    </div>
                    <div className="bg-gray-900 border border-orange-500/20 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black text-orange-400">{pending}</p>
                        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Pending</p>
                    </div>
                    <div className="bg-gray-900 border border-blue-500/20 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black text-blue-400">{shipped}</p>
                        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Shipped</p>
                    </div>
                    <div className="bg-gray-900 border border-green-500/20 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black text-green-400">{delivered}</p>
                        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Delivered</p>
                    </div>
                </div>

                {/* Revenue Banner */}
                <div className="mb-8 bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-2xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/30">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
                            <p className="text-white font-black text-xl">₹ {totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>
                    <span className="text-orange-400 text-xs font-black uppercase tracking-widest border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 rounded-full">
                        ⚡ Live
                    </span>
                </div>

                {/* Orders List */}
                <div className="space-y-5">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
                        >
                            {/* Top accent */}
                            <div className={`h-1 w-full ${
                                order.status === "Delivered"
                                    ? "bg-gradient-to-r from-green-400 to-emerald-500"
                                    : order.status === "Shipped"
                                    ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                                    : "bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500"
                            }`}></div>

                            {/* Order Header */}
                            <div className="flex flex-wrap justify-between items-start gap-4 px-6 py-5 border-b border-gray-800">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">Order</span>
                                        <span className="text-gray-400 text-xs font-mono bg-gray-800 px-2 py-0.5 rounded-lg">
                                            #{order._id.slice(-8).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                        <span className="font-semibold text-white">{order.user?.name}</span>
                                        <span className="text-gray-600 text-xs">{order.user?.email}</span>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${statusColor(order.status)}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot(order.status)}`}></span>
                                        {order.status}
                                    </div>
                                </div>

                                {/* Status Dropdown */}
                                <div className="flex flex-col items-end gap-1">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Update Status</label>
                                    <div className="relative">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className="appearance-none bg-gray-800 border border-gray-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer transition-all duration-200"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="px-6 py-4 space-y-2.5">
                                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Items</p>
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2.5 border-b border-gray-800/60 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.05 15.96 0 13.5 0c-1.3 0-2.4.56-3.16 1.44L12 3.44l1.66-2C14.07.56 14.77.25 15.5.25c1.38 0 2.5 1.12 2.5 2.5 0 .56-.14 1.08-.38 1.25H6.38C6.14 3.83 6 3.31 6 2.75 6 1.37 7.12.25 8.5.25c.73 0 1.43.31 1.84.69L12 3.44l1.66-2A3.49 3.49 0 0010.5 0C8.04 0 6 2.05 6 4.64c0 .48.11.92.18 1.36H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                                                </svg>
                                            </div>
                                            <span className="text-white text-sm font-semibold">
                                                {item.name}
                                                <span className="text-gray-600 font-normal ml-1">(x{item.quantity})</span>
                                            </span>
                                        </div>
                                        <span className="text-orange-400 font-black text-sm">₹ {item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            {/* ✅ Address + Total Footer - ab hamesha show hoga */}
                            <div className="flex flex-wrap justify-between items-start gap-4 px-6 py-4 bg-gray-800/30 border-t border-gray-800">
                                <div className="flex items-start gap-2">
                                    <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                    <div>
                                        {order.address ? (
                                            <>
                                                <p className="text-white text-sm font-bold">{order.address.fullName}</p>
                                                <p className="text-gray-500 text-xs">📞 {order.address.phone}</p>
                                                <p className="text-gray-500 text-xs">{order.address.addressLine1}</p>
                                                <p className="text-gray-500 text-xs">
                                                    {order.address.city}, {order.address.state} — {order.address.pincode}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-gray-600 text-xs italic">Address not available</p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Order Total</p>
                                    <p className="text-2xl font-black text-green-400">₹ {order.totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}