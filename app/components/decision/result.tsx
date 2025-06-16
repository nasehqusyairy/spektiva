import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "../ui/badge";
import { useTopsis } from "~/hooks/topsis";
import type { DecisionItem } from "~/models/decision";
import { useDashboard } from "../providers/DashboardProvider";

export default function TopsisResultTable() {
    const { decisions } = useDashboard();
    const { preferences } = useTopsis(decisions);

    const data = preferences.map(item => ({
        alternative: item.alternative,
        dPositive: item.dPositive.toFixed(4),
        dNegative: item.dNegative.toFixed(4),
        preference: item.preference.toFixed(4),
        percentage: ((item.preference) * 100).toFixed(2)
    })).sort((a, b) => Number(b.percentage) - Number(a.percentage));

    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Badge>Nilai Preferensi</Badge></TableHead>
                            <TableHead className="text-center">Si+</TableHead>
                            <TableHead className="text-center">Si-</TableHead>
                            <TableHead className="text-center">Preferensi</TableHead>
                            <TableHead className="text-center">Persentase</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableHead>
                                    <div className="text-wrap py-2 w-[200px]">{item.alternative}</div>
                                </TableHead>
                                <TableCell className="text-center">{item.dPositive}</TableCell>
                                <TableCell className="text-center">{item.dNegative}</TableCell>
                                <TableCell className="text-center">{item.preference}</TableCell>
                                <TableCell className={"text-center " + (Number(item.percentage) < 35 ? 'text-red-500' : '')}>{item.percentage}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
