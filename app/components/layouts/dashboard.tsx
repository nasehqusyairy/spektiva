import { Outlet } from "react-router";
import { DashboardProvider } from "../providers/DashboardProvider";
import type { Route } from "./+types/dashboard";
import { fetchAlternatives, fetchDecisions } from "~/lib/fetch-data";
import LoadingCard from "../loading-card";

export async function clientLoader({
    params,
}: Route.ClientLoaderArgs) {
    const decisions = await fetchDecisions();
    const alternatives = await fetchAlternatives();
    return { decisions, alternatives };
}

export function HydrateFallback() {
    return <LoadingCard />;
}

export default function DecisionLayout({ loaderData }: Route.ComponentProps) {
    return (
        <DashboardProvider decisions={loaderData.decisions} alternatives={loaderData.alternatives}>
            <Outlet />
        </DashboardProvider>
    )
}