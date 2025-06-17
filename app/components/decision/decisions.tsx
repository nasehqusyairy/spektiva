import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { TabsContent } from "~/components/ui/tabs";
import { useDashboard } from "~/components/providers/DashboardProvider";
import type { DecisionItem } from "~/models/decision";
import { useTopsis } from "~/hooks/topsis";

export default function Decision() {
    const { closeDialog, open, decisions } = useDashboard();
    const { criteria } = useTopsis(decisions);

    return (
        <TabsContent value="decision">
            <Card>
                <CardContent>
                    <Table id="decision-matrix">
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                {criteria.map((c) => (
                                    <TableHead key={c.code}>{c.name}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {decisions.map((item: DecisionItem, index) => (
                                <TableRow key={`decision-${index}`}>
                                    <TableHead>
                                        <div className="text-wrap py-2 w-[200px]">{item.alternative}</div>
                                    </TableHead>
                                    {criteria.map((c) => (
                                        <TableCell key={c.code}>{item[c.code]}%</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
    )
}
