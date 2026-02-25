import { getProductsByCategory } from "@/lib/data";
import PCsSectionClient from "./PCsSectionClient";

export default async function PCsSection() {
    const products = await getProductsByCategory("pcs");
    return <PCsSectionClient products={products} />;
}
