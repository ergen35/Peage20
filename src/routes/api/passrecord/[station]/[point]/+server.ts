import { AppDataSource, PassCard, PassPoint, PassStation, UsageRecord } from "$lib/data-sources";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ params, url }) => {
    //find station
    const ps = await AppDataSource.manager.findOne(PassStation,
        {
            where: {
                id: params.station
            },
            relations: {
                passPoints: true
            }
        })

    if (!ps) {
        throw error(404, "Station not found");
    }


    const passPoint = await AppDataSource.manager.findOne(PassPoint, {
        relations: {
            passStation: true,
            usageRecords: true
        },
        where: {
            id: params.point
        }
    });

    if (!passPoint) {
        throw error(404, "Passpoint not found.")
    }

    //find card
    const cardId = url.searchParams.get("card");
    if (!cardId) {
        throw error(400, "No card was specified.")
    }

    const cardRepos = AppDataSource.getRepository(PassCard);
    const userCard = await cardRepos.findOne(
        {
            where: {
                cardID: cardId
            },
            relations: {
                usageRecords: true,
            }
        }
    )

    if (!userCard) {
        throw error(404, "Card not registerd")
    }

    if (!userCard.isActivated) {
        throw error(400, "Card is not activated or valid")
    }

    if (userCard.cardBalance < ps.price) {
        throw error(402, "Payment Required. Card balance is zero.")
    }
    else {
        //debit card
        userCard.cardBalance -= ps.price;
        //create new usage record
        let usageRcd = new UsageRecord()
        usageRcd.paidAmount = ps.price
        //specify card
        usageRcd.passCard = userCard
        //specify point
        usageRcd.passPoint = passPoint
        usageRcd.usageDate = Date.now()
        usageRcd = await AppDataSource.manager.save(usageRcd);

        //TODO: check
        // userCard.usageRecords.push(usageRcd)
        // userCard = await cardRepos.save(userCard);

        //register usage record
        //TODO: check
        // passPoint.usageRecords.push(usageRcd);
        // passPoint = await AppDataSource.manager.save(passPoint);

        return new Response('pass ok', {
            status: 200,
            statusText: "ok"
        });
    }

};