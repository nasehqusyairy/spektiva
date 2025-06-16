import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { TabsContent } from "../ui/tabs";
import { useTopsis } from "~/hooks/topsis";
import { useDashboard } from "../providers/DashboardProvider";

export default function WeightedDecisions() {

    const { decisions } = useDashboard();
    const { weighted, criteria } = useTopsis(decisions);

    return (
        <TabsContent value="weighted">
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                {criteria.map((c) => (
                                    <TableHead className="text-center" key={`crit-${c.code}`}>{c.name}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {weighted.map((row, index) => (
                                <TableRow key={`weighted-${index}`}>
                                    <TableHead>
                                        <div className="text-wrap py-2 w-[200px]">{row.alternative}</div>
                                    </TableHead>
                                    {criteria.map((c) => {
                                        const score = row.scores.find(s => s.code === c.code)?.value ?? 0;
                                        return <TableCell className="text-center" key={`weight-${c.code}`}>{score}</TableCell>
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
