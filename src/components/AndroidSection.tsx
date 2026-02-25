import { getProductsByCategory } from "@/lib/data";
import AndroidSectionClient from "./AndroidSectionClient";

export default async function AndroidSection() {
    const products = await getProductsByCategory("android");
    return <AndroidSectionClient products={products} />;
}
