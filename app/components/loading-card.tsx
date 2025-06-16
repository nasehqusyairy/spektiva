import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

function LoadingCard() {
    return (
        <div className="flex justify-center items-center h-full">
            <Card className="md:w-1/2 lg:w-4/12">
                <CardContent className="flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin mb-4" />
                    <p>Memuat</p>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoadingCard;