import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"


interface CardProps {
    cardNo: string,
    expriyDate: string,
    cvv: string
}
export function YourCards({ cards }: { cards: CardProps[] }) {
    // This is mock data. In a real application, you'd fetch this from your backend.

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Your Cards</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {
                        cards.length === 0 && <span className="text-muted-foreground">No Card Added</span>
                    }
                    {cards.map((card: CardProps) => (
                        <li key={card.cardNo} className="flex justify-between items-center space-x-2 p-2 bg-secondary rounded-md">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <span>
                                {card.cardNo}
                            </span>
                            <span>
                                {card.expriyDate}
                            </span>
                            <span>
                                {card.cvv}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

