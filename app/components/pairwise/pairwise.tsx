import { useEffect, useState } from "react";
import PairwiseDialog from "~/components/pairwise/pairwise-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import type { CriteriaItem, PairwiseInputItem, TFN } from "~/models/criteria";
import { TabsContent } from "../ui/tabs";

type PairwiseProps = {
    criteria: CriteriaItem[];
    pairwise: PairwiseInputItem[];
    matrix?: TFN[][]
}

export default function Pairwise({ criteria, pairwise, matrix = [] }: PairwiseProps) {
    const [pairwiseInput, setPairwiseInput] = useState<PairwiseInputItem[]>(pairwise);
    const [selectedPair, setSelectedPair] = useState<{ from: string; to: string; value?: number } | null>(null);

    const handleOpenDialog = (i: number, j: number) => {
        if (i === j) return; // diagonal, tidak perlu edit

        const from = criteria[i].code;
        const to = criteria[j].code;

        // cari apakah sudah ada inputnya
        const existing = pairwiseInput.find(p => (p.from === from && p.to === to) || (p.from === to && p.to === from));
        let value = existing?.value;

        // Jika urutan dibalik, konversi value invers
        if (existing && existing.from !== from) {
            value = 10 - value!;
        }

        setSelectedPair({ from, to, value });
    };

    const handleSavePair = (value: number) => {
        if (!selectedPair) return;

        const { from, to } = selectedPair;

        const updated = pairwiseInput.filter(p => !(p.from === from && p.to === to) && !(p.from === to && p.to === from));
        updated.push({ from, to, value });
        setPairwiseInput(updated);
        setSelectedPair(null);
    };

    return (
        <TabsContent value="pairwise">
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
                            {matrix?.map((row, i) => (
                                <TableRow key={i}>
                                    <TableHead>{criteria[i].name}</TableHead>
                                    {row.map((tfn, j) => {
                                        return (
                                            <TableCell key={j}>
                                                <Button variant={"outline"} className="w-full" onClick={() => handleOpenDialog(i, j)}>
                                                    {tfn ? `${tfn[0]}, ${tfn[1]}, ${tfn[2]}` : '-'}
                                                </Button>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {selectedPair && (
                <PairwiseDialog
                    open={true}
                    onClose={() => setSelectedPair(null)}
                    onSave={handleSavePair}
                    criteriaA={criteria.find(c => c.code === selectedPair.from)!.name}
                    criteriaB={criteria.find(c => c.code === selectedPair.to)!.name}
                    initialValue={selectedPair.value}
                />
            )}
        </TabsContent>
    );
}

