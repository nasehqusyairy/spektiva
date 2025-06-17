import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import type { CriteriaItem } from "~/models/criteria";

// Helper skala linguistik
type LinguisticScale = { score: number; label: string; description: string; };

const benefitScales: LinguisticScale[] = [
    { score: 1, label: "Sangat Buruk", description: "Sangat tidak memenuhi kriteria" },
    { score: 2, label: "Buruk", description: "Tidak memenuhi kriteria secara signifikan" },
    { score: 3, label: "Cukup", description: "Memenuhi kriteria secara rata-rata" },
    { score: 4, label: "Baik", description: "Memenuhi kriteria dengan baik" },
    { score: 5, label: "Sangat Baik", description: "Memenuhi kriteria secara optimal" }
];

const costScales: LinguisticScale[] = [
    { score: 1, label: "Sangat Baik", description: "Sangat optimal (biaya rendah, deviasi kecil)" },
    { score: 2, label: "Baik", description: "Cukup optimal" },
    { score: 3, label: "Cukup", description: "Memenuhi rata-rata" },
    { score: 4, label: "Buruk", description: "Kurang optimal (biaya tinggi, deviasi besar)" },
    { score: 5, label: "Sangat Buruk", description: "Sangat tidak optimal" }
];

function getLinguisticScale(type: "benefit" | "cost"): LinguisticScale[] {
    return type === "benefit" ? benefitScales : costScales;
}

// Komponen utama
export default function CriteriaSummary({ criteria }: { criteria: CriteriaItem[] }) {
    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead rowSpan={2}>Kode</TableHead>
                            <TableHead rowSpan={2}>Nama Kriteria</TableHead>
                            <TableHead rowSpan={2}>Tipe</TableHead>
                            <TableHead colSpan={3} className="text-center">Skala Linguistik</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Skor</TableHead>
                            <TableHead>Label</TableHead>
                            <TableHead>Deskripsi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {criteria.map((criterion) => {
                            const scales = getLinguisticScale(criterion.type as "benefit" | "cost");
                            return scales.map((scale, index) => (
                                <TableRow key={`${criterion.code}-${scale.score}`}>
                                    {index === 0 && (
                                        <>
                                            <TableCell rowSpan={scales.length}>{criterion.code}</TableCell>
                                            <TableCell rowSpan={scales.length}>{criterion.name}</TableCell>
                                            <TableCell rowSpan={scales.length} className="capitalize">{criterion.type}</TableCell>
                                        </>
                                    )}
                                    <TableCell>{scale.score}</TableCell>
                                    <TableCell>{scale.label}</TableCell>
                                    <TableCell>{scale.description}</TableCell>
                                </TableRow>
                            ))
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
