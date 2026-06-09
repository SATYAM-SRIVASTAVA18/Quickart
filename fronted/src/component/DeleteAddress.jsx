import API from "./Ap";

export default function DeleteAddress({ id, refresh }) {

    const handleDelete = async () => {
        try {
            await API.delete(`/address/${id}`);
            alert("Deleted");
            refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mt-2"
        >
            Delete
        </button>
    );
}