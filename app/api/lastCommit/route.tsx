import { execSync } from 'child_process';

export async function GET(req: Request) {
  try {
    const commitSha = execSync('git rev-parse HEAD').toString().trim();
    return new Response(JSON.stringify({ commitSha: commitSha }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ocorreu um erro ao buscar o ultimo commit.' }), { status: 500 });
  }
}
