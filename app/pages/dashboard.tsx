import Header from "~/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Decision from "~/components/decision/decisions";
import Combobox from "~/components/Combobox";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useDashboard } from "~/components/providers/DashboardProvider";
import NormalizedDecisions from "~/components/decision/normalized";
import WeightedDecisions from "~/components/decision/weighted";
import IdealSolutions from "~/components/decision/ideals";
import TopsisResultTable from "~/components/decision/result";
import DecisionGenerator from "~/components/decision/generator";
import { useState } from "react";

const records = [
  {
    value: "2",
    label: "14 Juni 2024",
  },
  {
    value: "1",
    label: "10 Maret 2024",
  },
]

export default function Dashboard() {
  const { closeDialog, open, openDialog } = useDashboard();
  const [matrixReady, setMatrixReady] = useState(false);

  return (
    <>
      <Header endpoint="Pengukuran" />
      <div className="p-4">
        <Tabs defaultValue="decision">
          <div className="lg:flex justify-between">
            <div className="flex gap-2 mb-4 lg:mb-0">
              <Button onClick={openDialog}><Plus />Baru</Button>
              <Combobox records={records} name="tanggal" />
            </div>
            <TabsList>
              <TabsTrigger value="decision">Nilai</TabsTrigger>
              <TabsTrigger value="normalized">Ternormalisasi</TabsTrigger>
              <TabsTrigger value="weighted">Terbobot</TabsTrigger>
              <TabsTrigger value="results">Hasil</TabsTrigger>
            </TabsList>
          </div>
          <Decision />
          <NormalizedDecisions />
          <WeightedDecisions />
          <TabsContent value="results">
            <IdealSolutions />
            <TopsisResultTable />
          </TabsContent>
        </Tabs>
      </div>
      <DecisionGenerator
        open={open}
        onClose={() => closeDialog()}
        onComplete={() => {
          closeDialog();
          setMatrixReady(true);
        }}
      />
    </>
  )
}
