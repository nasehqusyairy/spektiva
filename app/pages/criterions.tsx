import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useCriterions } from "~/components/providers/CriterionsProvider";
import Pairwise from "~/components/pairwise/pairwise";
import NormalizedPairwise from "~/components/pairwise/normalized";
import DefuzzifiedPairwise from "~/components/pairwise/defuzzificated";
import Header from "~/components/Header";

export default function Criterions() {
    const { matrix, columnSum, syntheticExtent, defuzzified, criteria, pairwise } = useCriterions();
    return (
        <>
            <Header endpoint="Kriteria" />
            <div className="p-4">
                <Tabs defaultValue="pairwise">
                    <TabsList>
                        <TabsTrigger value="pairwise">Komparasi</TabsTrigger>
                        {/* <TabsTrigger value="sumcolumn"><Sigma /> Kolom</TabsTrigger> */}
                        <TabsTrigger value="normalized">Normalisasi</TabsTrigger>
                        <TabsTrigger value="defuzzyfied">Hasil</TabsTrigger>
                    </TabsList>
                    <Pairwise criteria={criteria} pairwise={pairwise} matrix={matrix} />
                    {/* <ColumnSumPairwise criteria={criteria} columnSum={columnSum} /> */}
                    <NormalizedPairwise criteria={criteria} syntheticExtent={syntheticExtent} />
                    <DefuzzifiedPairwise criteria={criteria} defuzzified={defuzzified} />
                </Tabs>
            </div>
        </>
    )
}
