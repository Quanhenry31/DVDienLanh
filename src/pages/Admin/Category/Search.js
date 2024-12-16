'use client';

const SearchProduct = ({ value, onChange }) => {
    return (
        <div className="relative rounded-md shadow-sm">
            <input
                value={value}
                placeholder="Tìm kiếm..."
                onChange={onChange}
                className="block w-[500px] rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 outline-0"
            />
        </div>
    );
};

export default SearchProduct;
