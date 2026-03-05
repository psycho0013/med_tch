import { getProductsByCategory } from "@/lib/data";
import AppleWatchesSectionClient from "@/components/AppleWatchesSectionClient";

export default async function AppleWatchesSection() {
    const products = await getProductsByCategory("apple-watches");
    return <AppleWatchesSectionClient products={products} />;
}
