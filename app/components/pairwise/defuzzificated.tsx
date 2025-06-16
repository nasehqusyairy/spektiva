import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Card, CardContent } from "~/components/ui/card";
import type { CriteriaItem } from "~/models/criteria";
import { TabsContent } from "../ui/tabs";

export default function DefuzzifiedPairwise({ criteria, defuzzified = [] }: {
    criteria: CriteriaItem[],
    defuzzified?: {
        defuzz: number;
        weight: number
    }[]
}) {
    return (
        <TabsContent value="defuzzyfied">
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead className="text-center">Defuzzifikasi</TableHead>
                                <TableHead className="text-center">Bobot</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {criteria.map((c, idx) => (
                                <TableRow key={c.code}>
                                    <TableHead>{c.name}</TableHead>
                                    <TableCell className="text-center">{defuzzified[idx]?.defuzz}</TableCell>
                                    <TableCell className="text-center">{defuzzified[idx]?.weight}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
