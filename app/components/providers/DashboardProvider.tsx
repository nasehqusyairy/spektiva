import { createContext, useContext, useState, type ReactNode } from "react";
import type { DecisionItem } from "~/models/decision";

interface DashboardContextType {
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    decisions: DecisionItem[];
    alternatives: { code: string, name: string }[];
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
    const ctx = useContext(DashboardContext);
    if (!ctx) throw new Error("useDashboard must be used inside dashboardProvider");
    return ctx;
}

interface dashboardProviderProps {
    children: ReactNode;
    decisions: DecisionItem[];
    alternatives: { code: string, name: string }[];
}

export function DashboardProvider({ children, decisions, alternatives }: dashboardProviderProps) {
    const [open, setOpen] = useState(false);


    function openDialog() {
        setOpen(true);
    }

    function closeDialog() {
        setOpen(false);
    }

    return (
        <DashboardContext.Provider value={{
            open,
            openDialog,
            closeDialog,
            decisions,
            alternatives
        }}>
            {children}
        </DashboardContext.Provider>
    );
}
