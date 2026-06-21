import { getProductsByCategory } from "@/lib/data";
import MonitorsSectionClient from "./MonitorsSectionClient";

export default async function MonitorsSection() {
    const products = await getProductsByCategory("monitors");
    return <MonitorsSectionClient products={products} />;
}
