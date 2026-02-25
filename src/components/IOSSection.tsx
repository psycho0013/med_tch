import { getProductsByCategory } from "@/lib/data";
import IOSSectionClient from "./IOSSectionClient";

export default async function IOSSection() {
    const products = await getProductsByCategory("ios");
    return <IOSSectionClient products={products} />;
}
