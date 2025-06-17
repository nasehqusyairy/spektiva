import CriteriaSummary from "~/components/criteria-info";
import Header from "~/components/Header";
import type { Route } from "./+types/scales";
import { fetchCriteria } from "~/lib/fetch-data";
import LoadingCard from "~/components/loading-card";

export async function clientLoader({
    params,
}: Route.ClientLoaderArgs) {
    return await fetchCriteria();
}

export function HydrateFallback() {
    return <LoadingCard />;
}


function Scales({ loaderData }: Route.ComponentProps) {
    return (<>
        <Header endpoint="Skala Penilaian" ></Header>
        <div className="p-4">
            <CriteriaSummary criteria={loaderData}></CriteriaSummary>
        </div>
    </>);
}

export default Scales;