import { NextApiRequest, NextApiResponse } from "next";
import { InventoryMovement } from "@prisma/client";
import { prisma } from "@/service/prisma";

type Data = {
    inventoryMovements: InventoryMovement[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        const inventoryMovements = await prisma.inventoryMovement.findMany();
        res.status(200).json({ inventoryMovements });
    }
    else if (req.method === "POST"){
        const { body } = req;    
        const newInventoryMovement = await prisma.inventoryMovement.create({
          data: {
            movementType: body.movementType,
            quantity: body.quantity,
            materialId: body.materialId,  
            userId: body.userId,
            date: body.date,         
          },
        });    
        res.status(200).json({ newInventoryMovement });
    }
    else{
        res.status(405).json({ response: 'method not allowed' });
    }    
}