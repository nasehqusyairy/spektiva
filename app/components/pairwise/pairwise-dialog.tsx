import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

interface PairwiseDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (value: number) => void;
    criteriaA: string;
    criteriaB: string;
    initialValue?: number;
}

const PairwiseDialog: React.FC<PairwiseDialogProps> = ({ open, onClose, onSave, criteriaA, criteriaB, initialValue }) => {
    const [value, setValue] = useState<number | undefined>(initialValue);

    const handleSave = () => {
        if (value !== undefined) {
            onSave(value);
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Perbandingan Kriteria</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p>Seberapa penting <span className="underline">{criteriaA}</span> dibanding <span className="underline">{criteriaB}</span>?</p>

                    <RadioGroup
                        value={value?.toString() ?? ""}
                        onValueChange={(val) => setValue(parseInt(val))}
                        className="space-y-2"
                    >
                        {/* {[3, 5, 7, 9].map((num) => ( */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`radio-${num}`} />
                                <Label htmlFor={`radio-${num}`}>
                                    {getSaatyLabel(num)}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={onClose}>Batal</Button>
                    </DialogClose>
                    <Button onClick={handleSave} disabled={value === undefined}>Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Fungsi bantu: label Saaty scale
function getSaatyLabel(value: number): string {
    switch (value) {
        case 1: return "Sama penting";
        case 2: return "Sedikit lebih penting";
        case 3: return "Agak lebih penting";
        case 4: return "Cukup lebih penting";
        case 5: return "Lebih penting";
        case 6: return "Lumayan jauh lebih penting";
        case 7: return "Jauh lebih penting";
        case 8: return "Sangat jauh lebih penting";
        case 9: return "Mutlak lebih penting";
        default: return "";
    }
}

export default PairwiseDialog;
