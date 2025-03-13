
export default function GreenButton({ label }) {
    return (
        <button
            className="border border-white text-white py-2 px-2.5 hover:text-green-500 hover:border-green-500 hover:bg-white rounded-lg bg-green-500">{label}
        </button>
    );
}