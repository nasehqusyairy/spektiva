import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useCriterions } from "~/components/providers/CriterionsProvider";
import Pairwise from "~/components/pairwise/pairwise";
import NormalizedPairwise from "~/components/pairwise/normalized";
import DefuzzifiedPairwise from "~/components/pairwise/defuzzificated";
import Header from "~/components/Header";
import GMean from "~/components/pairwise/geometric-mean";

export default function Criterions() {
    const { matrix, geometricMean, normalized, defuzzified, criteria, pairwise } = useCriterions();
    return (
        <>
            <Header endpoint="Kriteria" />
            <div className="p-4">
                <Tabs defaultValue="pairwise">
                    <TabsList>
                        <TabsTrigger value="pairwise">Komparasi</TabsTrigger>
                        <TabsTrigger value="sumcolumn">G. Mean</TabsTrigger>
                        <TabsTrigger value="normalized">Normalisasi</TabsTrigger>
                        <TabsTrigger value="defuzzyfied">Hasil</TabsTrigger>
                    </TabsList>
                    <Pairwise criteria={criteria} />
                    <GMean criteria={criteria} geometricMean={geometricMean} />
                    <NormalizedPairwise criteria={criteria} syntheticExtent={normalized} />
                    <DefuzzifiedPairwise criteria={criteria} defuzzified={defuzzified} />
                </Tabs>
            </div>
        </>
    )
}
