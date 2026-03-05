'use client'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const min_price = searchParams.get("min_price")
    ? Number(searchParams.get("min_price"))
    : 300;

  const max_price = searchParams.get("max_price")
    ? Number(searchParams.get("max_price"))
    : 80000;

  function filterHandler(value) {
    const query = new URLSearchParams(searchParams.toString());

    query.set("min_price", value[0]);
    query.set("max_price", value[1]);

    router.push(`?${query.toString()}`, { scroll: false });
  }

  return (
    <div className='bg-[#EEEFF6] rounded-2xl shadow-sm p-5'>
      <h4 className="font-medium text-gray-800 mb-3">Price</h4>

      <RangeSlider
        min={300}
        max={80000}
        defaultValue={[min_price, max_price]}
        onThumbDragEnd={filterHandler}   // 🔥 important change
        className="w-full"
      />

      <div className="flex justify-between text-xs mt-2">
        <span>₹{min_price}</span>
        <span>₹{max_price}</span>
      </div>
    </div>
  );
}
