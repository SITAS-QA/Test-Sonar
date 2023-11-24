import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/service/prisma";
import { checkProtectedApi } from "@/utils/checkServerSession";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        await checkProtectedApi(req, res, 'ADMIN');
        const { email } = req.query;
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        res.status(200).json({ user });
    }
    catch(error){
        res.status(500).json({ error });
    }    
}