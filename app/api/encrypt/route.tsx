import Criptografia from "@/app/crypto/main";


export async function POST(req: Request) {
    const body = await req.json();
    const { string } = body;
    const cripto = new Criptografia();
    const hashed = await cripto.criptografar(string);
    return new Response(hashed, { status: 200 });
}