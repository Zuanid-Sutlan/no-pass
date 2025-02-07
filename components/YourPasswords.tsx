import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

interface PasswordProps {
    website: string,
    username: string,
    password: string
}
export function YourPasswords({ passwords }: { passwords: PasswordProps[] }) {
    // This is mock data. In a real application, you'd fetch this from your backend.

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Your Passwords</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {
                        passwords.length === 0 && <span className="text-muted-foreground">No Password Added</span>
                    }
                    {passwords.map((password, index) => (
                        <li key={index} className="flex justify-between items-center space-x-2 p-2 bg-secondary rounded-md">
                            <Lock className="h-5 w-5 text-primary" />
                            <span>
                                {password.website}
                            </span>
                            <span>
                                {password.username}
                            </span>
                            <span>
                                {password.password}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

