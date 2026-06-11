export async function POST() {
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      "Set-Cookie": `admin_token=; HttpOnly; Path=/; Max-Age=0`,
    },
  });
}