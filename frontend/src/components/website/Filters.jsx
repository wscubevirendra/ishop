import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import PriceFilter from "./PriceFilter";
import Link from "next/link";
import { fetchBrand, fetchCategory, fetchColor } from "@/api/api-call";

const Filters = async () => {
  const { category } = await fetchCategory({ status: true });
  const { color } = await fetchColor({ status: true });
  const { brand } = await fetchBrand({ status: true });

  return (
    <aside className="text-sm space-y-8 sticky top-20">

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Link href="/products">
          <button className="text-xs text-blue-600 hover:underline">
            Clear All
          </button>
        </Link>

      </div>

      <CategoryFilter categories={category} />
      <PriceFilter />
      <ColorFilter colors={color} />
      <BrandFilter brands={brand} />

    </aside>
  );
};

export default Filters;
