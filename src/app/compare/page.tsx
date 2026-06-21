import { getAllProducts } from "@/lib/data";
import CompareClient from "@/app/compare/CompareClient";

export default async function ComparePage() {
    const products = await getAllProducts();

    return <CompareClient products={products} />;
}
