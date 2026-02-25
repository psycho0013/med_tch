import { getProductsByCategory } from "@/lib/data";
import AccessoriesSectionClient from "./AccessoriesSectionClient";

export default async function AccessoriesSection() {
    const products = await getProductsByCategory("accessories");
    return <AccessoriesSectionClient products={products} />;
}
