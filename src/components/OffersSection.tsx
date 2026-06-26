import { getOfferProducts } from "@/lib/data";
import OffersSectionClient from "./OffersSectionClient";

export default async function OffersSection() {
    const products = await getOfferProducts();
    return <OffersSectionClient products={products} />;
}
