import type { CriteriaItem, TFN } from "~/models/criteria";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Card, CardContent } from "~/components/ui/card";
import { TabsContent } from "../ui/tabs";

export default function GMean({ criteria, geometricMean = [] }: {
    criteria: CriteriaItem[],
    geometricMean?: TFN[]
}) {
    return (
        <TabsContent value="sumcolumn">
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead className="text-center">L</TableHead>
                                <TableHead className="text-center">M</TableHead>
                                <TableHead className="text-center">U</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {criteria.map((c, idx) => (
                                <TableRow key={c.code}>
                                    <TableHead>{c.name}</TableHead>
                                    <TableCell className="text-center">{geometricMean[idx] ? geometricMean[idx][0] : '-'}</TableCell>
                                    <TableCell className="text-center">{geometricMean[idx] ? geometricMean[idx][1] : '-'}</TableCell>
                                    <TableCell className="text-center">{geometricMean[idx] ? geometricMean[idx][2] : '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
    )
}
