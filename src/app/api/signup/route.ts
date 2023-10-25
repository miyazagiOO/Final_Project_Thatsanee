import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
interface RequestBody {
  username: string;
  password: string;
  name: string;
}
export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  const user = await prisma.user.create({
    data: {
      email: body.username,
      password: await bcrypt.hash(body.password, 10),
      name: body.name,
    },
  });
  if (user) {
    const { password, ...noPassword } = user;
    return new Response(JSON.stringify(noPassword));
  }
  return new Response(JSON.stringify(null));
}
