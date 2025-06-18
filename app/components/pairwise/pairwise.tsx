import { useEffect, useState } from "react";
import PairwiseDialog from "~/components/pairwise/pairwise-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import type { CriteriaItem } from "~/models/criteria";
import { TabsContent } from "../ui/tabs";
import { useCriterions } from "../providers/CriterionsProvider";

type PairwiseProps = {
    criteria: CriteriaItem[];
}

export default function Pairwise({ criteria }: PairwiseProps) {
    const { pairwise, matrix, setPairwise } = useCriterions();
    const [selectedPair, setSelectedPair] = useState<{ from: string; to: string; value?: number } | null>(null);

    const handleOpenDialog = (i: number, j: number) => {
        if (i === j) return; // diagonal, tidak perlu edit

        const from = criteria[i].code;
        const to = criteria[j].code;

        // cari apakah sudah ada inputnya
        const existing = pairwise.find(p => (p.from === from && p.to === to) || (p.from === to && p.to === from));
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

        const updated = pairwise.filter(p => !(p.from === from && p.to === to) && !(p.from === to && p.to === from));
        updated.push({ from, to, value });
        // console.log({ pairwise, updated });

        setPairwise(updated);
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
                                        const isEditable = i < j; // hanya atas diagonal
                                        return (
                                            <TableCell key={j}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                    // disabled={!isEditable}
                                                    onClick={() => handleOpenDialog(i, j)}
                                                >
                                                    {tfn ? `${tfn[0]}, ${tfn[1]}, ${tfn[2]}` : '-'}
                                                </Button>
                                            </TableCell>
                                        );
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

