import { Outlet } from "react-router";
import { CriterionsProvider } from "../providers/CriterionsProvider";
import type { Route } from "./+types/criterions";
import { fetchCriteria, fetchPairwise } from "~/lib/fetch-data";
import LoadingCard from "../loading-card";

export async function clientLoader({
    params,
}: Route.ClientLoaderArgs) {
    const criteria = await fetchCriteria();
    const pairwise = await fetchPairwise();
    return { criteria, pairwise };
}

export function HydrateFallback() {
    return <LoadingCard />;
}

export default function CriterionsLayout({ loaderData }: Route.ComponentProps) {
    return (
        <CriterionsProvider loaderData={loaderData}>
            <Outlet />
        </CriterionsProvider>
    )
}