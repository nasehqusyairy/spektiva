import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { TabsContent } from "../ui/tabs";
import criteria from "~/data/criteria.json";
import { useTopsis } from "~/hooks/topsis";
import { useDashboard } from "../providers/DashboardProvider";

export default function NormalizedDecisions() {

    const { decisions } = useDashboard();
    const { normalized } = useTopsis(decisions);

    return (
        <TabsContent value="normalized">
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                {criteria.map((c) => (
                                    <TableHead className="text-center" key={c.code}>{c.name}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {normalized.map((row, index) => (
                                <TableRow key={index}>
                                    <TableHead>
                                        <div className="text-wrap py-2 w-[200px]">{row.alternative}</div>
                                    </TableHead>
                                    {criteria.map((c) => {
                                        const score = row.scores.find(s => s.code === c.code)?.value ?? 0;
                                        return <TableCell className="text-center" key={c.code}>{score}</TableCell>
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
