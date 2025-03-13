

export default function RedButton({label}) {
    return (
        <button
            className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-white border hover:text-red-500 hover:border hover:border-red-500">{label}
        </button>
    );
}