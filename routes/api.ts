import express from 'express';
import { PrismaClient } from '@prisma/client';
import sanitizeHtml from 'sanitize-html';

const prisma = new PrismaClient();

const apiRouter : express.Router = express.Router();

apiRouter.use(express.json());

apiRouter.delete("/kirjoitukset/:id", async (req : express.Request, res : express.Response) : Promise<void> => {

    let keskustelut = await prisma.keskustelu.delete({
        where : {
            id : Number(req.params.id)
        }
    });

    res.json(keskustelut);
});

apiRouter.post("/kirjoitukset", async (req : express.Request, res : express.Response) : Promise<void> => {
    
    let keskustelut = await prisma.keskustelu.create({
        data : {
                otsikko : req.body.otsikko,
                kirjoittaja : req.body.kirjoittaja,
                sisalto : sanitizeHtml(req.body.sisalto)
               }
    });

    res.json(keskustelut);
});

apiRouter.get("/kirjoitukset/:id", async (req : express.Request, res : express.Response) : Promise<void> => {

    let keskustelut = await prisma.keskustelu.findUnique({
        where: {
            id : Number(req.params.id)
        },
        select: {
            sisalto : true
        }
    });
    
    res.json(keskustelut);
});

apiRouter.get("/kirjoitukset", async (req : express.Request, res : express.Response) : Promise<void> => {

    let keskustelut = await prisma.keskustelu.findMany({
        orderBy : {
            id : "desc"
        }
    });

    res.json(keskustelut);
});

export default apiRouter;