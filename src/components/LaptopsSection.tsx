import { getProductsByCategory } from "@/lib/data";
import LaptopsSectionClient from "./LaptopsSectionClient";

export default async function LaptopsSection() {
    const products = await getProductsByCategory("laptops");
    return <LaptopsSectionClient products={products} />;
}
