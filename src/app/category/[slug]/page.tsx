import { getProductsByCategory } from "@/lib/data";
import CategoryProductsClient from "./CategoryProductsClient";
import type { ProductCategory } from "@/lib/types";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const products = await getProductsByCategory(slug as ProductCategory);

    return <CategoryProductsClient products={products} category={slug} />;
}
