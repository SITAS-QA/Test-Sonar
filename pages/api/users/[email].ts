import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/service/prisma";
import { checkPrivateApi } from "@/utils/checkServerSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await checkPrivateApi(req, res);
  const { email } = req.query;
  if (typeof email === "string") {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    res.status(200).json({ user });
  } else {
    res.status(400).json({ error: "Email should be a string"});
}
}