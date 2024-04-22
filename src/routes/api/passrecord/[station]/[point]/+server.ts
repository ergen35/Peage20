import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/prisma";

export const POST: RequestHandler = async ({ params, url }) => {

    //find station
    const station = await prisma.passStation.findFirst({
        where: {
            id: params.station
        },
        include: {
            passPoints: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    })

    if (!station) {
        throw error(404, "Station not found");
    }


    const passPoint = await prisma.passPoint.findFirst({
        where: {
            id: params.point
        },
        include: {
            passStation: true,
            usageRecords: true
        }
    })

    if (!passPoint) {
        throw error(404, "Passpoint not found.")
    }

    //find card
    const cardId = url.searchParams.get("card");
    if (!cardId) {
        throw error(400, "No card was specified.")
    }

    const userCard = await prisma.passCard.findFirst({
        where: {
            cardID: cardId
        },
        include: {
            usageRecords: true,
            cardOwner: {
                select: {
                    accountBalance: true
                }
            }
        }
    });


    if (!userCard) {
        throw error(404, "Card not registerd")
    }

    if (!userCard.isActivated) {
        throw error(400, "Card is not activated or valid")
    }


    if (userCard.cardOwner.accountBalance < station.price) {
        throw error(402, "Payment Required. Card balance is zero.")
    }
    else {
        //debit card
        userCard.cardOwner.accountBalance -= station.price;

        //create new usage record
        await prisma.usageRecord.create({
            data: {
                usageDate: new Date(),
                paidAmount: station.price,
                passCardId: userCard.cardID,
                passPointId: passPoint.id,
            }
        })

        return new Response('pass ok', {
            status: 200,
            statusText: "ok"
        });
    }
};