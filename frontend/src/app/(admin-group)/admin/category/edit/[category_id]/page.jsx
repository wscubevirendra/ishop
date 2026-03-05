import { fetchCategory } from "@/api/api-call";
import EditCategory from "@/components/admin/EditCategory";

async function EditCategoryPage({ params }) {
    const promise = await params;
    const id = promise.category_id ?? null;
    const { category, imageBaseUrl } = await fetchCategory({ id });

    return (
        <EditCategory imageBaseUrl={imageBaseUrl} category={category[0]} />
    );
}


export default EditCategoryPage;