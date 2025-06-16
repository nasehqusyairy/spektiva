import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import type { DecisionItem, IdealSolution } from "~/models/decision";
import { Badge } from "../ui/badge";
import { useTopsis } from "~/hooks/topsis";
import { useDashboard } from "../providers/DashboardProvider";

export default function IdealSolutions() {

    const { decisions } = useDashboard()
    const { ideals, criteria } = useTopsis(decisions);

    return (
        <Card className="mb-4">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Badge>Nilai Ideal</Badge></TableHead>
                            <TableHead className="text-center">A+</TableHead>
                            <TableHead className="text-center">A-</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ideals.map((item, index) => {
                            const criterion = criteria.find(c => c.code === item.code);
                            return (
                                <TableRow key={index}>
                                    <TableHead>{criterion?.name ?? item.code}</TableHead>
                                    <TableCell className="text-center">{item.positive}</TableCell>
                                    <TableCell className="text-center">{item.negative}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
