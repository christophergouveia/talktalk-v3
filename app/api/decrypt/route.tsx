import Criptografia from "@/app/crypto/main";


export async function POST(req: Request) {
    const body = await req.json();
    const { string } = body;
    const cripto = new Criptografia();
    const hashed = await cripto.verificarHash("oi", "87f633634cc4b02f628685651f0a29b7bfa22a0bd841f725c6772dd00a58d489");
    return new Response(hashed ? "true" : "false", { status: 200 });
}