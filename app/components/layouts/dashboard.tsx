import { Outlet } from "react-router";
import { DashboardProvider } from "../providers/DashboardProvider";
import type { Route } from "./+types/dashboard";
import { fetchDecisions } from "~/lib/fetch-data";
import LoadingCard from "../loading-card";

export async function clientLoader({
    params,
}: Route.ClientLoaderArgs) {
    return await fetchDecisions();
}

export function HydrateFallback() {
    return <LoadingCard />;
}

export default function DecisionLayout({ loaderData }: Route.ComponentProps) {
    return (
        <DashboardProvider decisions={loaderData}>
            <Outlet />
        </DashboardProvider>
    )
}