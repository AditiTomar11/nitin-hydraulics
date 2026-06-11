import { signToken } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ email });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
    },
  });
}