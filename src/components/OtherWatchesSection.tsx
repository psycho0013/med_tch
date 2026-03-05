import { getProductsByCategory } from "@/lib/data";
import OtherWatchesSectionClient from "@/components/OtherWatchesSectionClient";

export default async function OtherWatchesSection() {
    const products = await getProductsByCategory("other-watches");
    return <OtherWatchesSectionClient products={products} />;
}
