import { Label } from "@radix-ui/react-label";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export function LoginCard() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>
                    Faça o Login
                </CardTitle>
                <CardDescription>
                    Entre com os dados
                </CardDescription>
                <CardAction>
                    <Link href={"/cadastro"}>
                        <Button variant="link">Criar Conta</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="email">
                                    Email
                                </Label>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">
                                    Senha
                                </Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </CardFooter>
        </Card>
    )
}