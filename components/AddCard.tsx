"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUser } from "@clerk/nextjs"
import { addCardServer } from "@/actions/actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    cardNumber: z.string().min(16, {
        message: "Card number must be at least 16 digits.",
    }).max(19,
        {
            message: "Card number must be at most 19 digits."
        }).regex(/^\d+$/, {
            message: "Card number must only contain digits.",
        }),
    expiryDate: z.string().min(5, {
        message: "Expiry date must be in the format MM/YY.",
    }).max(5, {
        message: "Expiry date must be in the format MM/YY.",
    }).regex(/^\d{2}\/\d{2}$/, {
        message: "Expiry date must be in the format MM/YY.",
    }),
    cvv: z.string().min(3, {
        message: "CVV must be at least 3 digits.",
    }).max(4, {
        message: "CVV must be at most 4 digits.",
    }).regex(/^\d+$/, {
        message: "CVV must only contain digits.",
    }),
});

export function AddCard() {

    const user = useUser()
    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        },
    })


    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        if (user.user) {
            addCardServer(values.cardNumber, values.expiryDate, values.cvv, user.user?.id)
            toast.success("Card Added!")
            form.reset()
            router.refresh
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Add a Credit Card</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Card number" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    {/* <FormMessage /> */}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Card expiry date MM/YY" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                        <Input placeholder="3 digits CVV" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" onClick={form.handleSubmit(onSubmit)}>
                    Add Card
                </Button>
            </CardFooter>
        </Card>
    )
}

