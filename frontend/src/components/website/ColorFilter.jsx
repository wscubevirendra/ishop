'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";

export default function ColorFilter({ colors }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentColors = searchParams.get("color_slug");
  const selectedColors = currentColors ? currentColors.split(",") : [];

  function filterHandler(slug) {
    const query = new URLSearchParams(searchParams.toString());
    let colorArray = [...selectedColors];

    if (colorArray.includes(slug)) {
      colorArray = colorArray.filter(c => c !== slug);
    } else {
      colorArray.push(slug);
    }

    if (colorArray.length > 0) {
      query.set("color_slug", colorArray.join(","));
    } else {
      query.delete("color_slug");
    }

    router.push(`?${query.toString()}`, { scroll: false });
  }

  function clearFilter() {
    const query = new URLSearchParams(searchParams.toString());
    query.delete("color_slug");
    router.push(`?${query.toString()}`, { scroll: false });
  }

  return (
    <div className='bg-[#EEEFF6] rounded-2xl shadow-sm p-5'>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-gray-800">By Color</h4>

        {selectedColors.length > 0 && (
          <button
            onClick={clearFilter}
            className="text-xs text-teal-500 font-bold hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColors.includes(color.slug);

          return (
            <button
              key={color._id}
              onClick={() => filterHandler(color.slug)}
              className={`relative w-8 h-8 rounded-full border transition-all flex items-center justify-center
                ${isSelected
                  ? 'ring-2 ring-black scale-110'
                  : 'hover:scale-110'
                }`}
              style={{ backgroundColor: color.color_code }}
            >
              {isSelected && (
                <FaCheck
                  size={10}
                  className="text-white"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
