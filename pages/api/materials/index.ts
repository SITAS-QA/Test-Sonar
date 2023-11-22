import { NextApiRequest, NextApiResponse } from "next";
import { Material } from "@prisma/client";
import { prisma } from "@/service/prisma";

type Data = {
    materials: Material[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === "GET") {
        const materials = await prisma.material.findMany();
        res.status(200).json({ materials });
    }
    else if (req.method === "POST"){
        const { body } = req;    
        const newMaterial = await prisma.material.create({
          data: {
            name: body.name,
            quantity: body.quantity,
            userId: body.userId,           
          },
        });    
        res.status(200).json({ newMaterial });
    }
    else{
        res.status(405).json({ response: 'method not allowed' });
    }    
}