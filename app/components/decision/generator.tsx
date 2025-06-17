import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "~/components/ui/alert-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Loader2, CircleDashed, Check } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { useCriterions } from "../providers/CriterionsProvider";
import { useDashboard } from "../providers/DashboardProvider";

interface DecisionDialogProps {
    open: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export default function DecisionGenerator({ open, onClose, onComplete }: DecisionDialogProps) {

    const { criteria: criterias } = useCriterions();
    const { alternatives } = useDashboard();

    const [progress, setProgress] = useState<Record<string, number>>({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (!open) {
            setProgress({});
            setCompleted(false);
            return;
        }

        const timers: NodeJS.Timeout[] = [];

        alternatives.forEach((alt, i) => {
            criterias.forEach((crit, j) => {
                const delay = (i * criterias.length + j + 1) * 500;

                timers.push(
                    setTimeout(() => {
                        setProgress(prev => {
                            const updated = { ...prev, [`${alt.name}-${crit.name}`]: 1 };
                            if (Object.keys(updated).length === alternatives.length * criterias.length) {
                                setTimeout(() => setCompleted(true), 500);
                            }
                            return updated;
                        });
                    }, delay)
                );
            });
        });

        return () => timers.forEach(clearTimeout);
    }, [open]);

    function getAlternativeStatus(alt: string) {
        const total = criterias.length;
        const done = criterias.filter(crit => progress[`${alt}-${crit.name}`]).length;

        if (done === 0) return "pending";
        if (done < total) return "loading";
        return "done";
    }

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-xl max-h-[80vh] overflow-hidden">
                <AlertDialogHeader>
                    <AlertDialogTitle>Penyusunan Matriks Keputusan</AlertDialogTitle>
                </AlertDialogHeader>

                <ScrollArea className="max-h-[60vh] pr-2">
                    <Accordion type="multiple" className="space-y-2">
                        {alternatives.map((alt, i) => {
                            const status = getAlternativeStatus(alt.name);
                            return (
                                <AccordionItem key={i} value={alt.name}>
                                    <AccordionTrigger className="flex justify-between items-center">
                                        <div className="w-8/12">{alt.name}</div>
                                        {status === "pending" && <CircleDashed className="text-gray-400" size={18} />}
                                        {status === "loading" && <Loader2 className="animate-spin text-blue-500" size={18} />}
                                        {status === "done" && <Check className="text-green-600 -rotate-0!" size={18} />}
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                        {criterias.map((crit, j) => {
                                            const key = `${alt.name}-${crit.name}`;
                                            const done = progress[key];
                                            return (
                                                <div key={j} className="flex justify-between items-center px-2">
                                                    <span>{crit.name}</span>
                                                    {done ? (
                                                        <Check className="text-green-600" size={18} />
                                                    ) : (
                                                        <Loader2 className="animate-spin text-blue-500" size={18} />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </ScrollArea>

                <AlertDialogFooter className="pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button disabled={!completed} onClick={onComplete}>
                        Lanjutkan
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
