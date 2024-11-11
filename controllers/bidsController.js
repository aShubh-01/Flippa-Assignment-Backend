const { prisma } = require('../config');

exports.createBid = async (req, res) => {
    const { bidAmount, assetId } = req.body;
    const userId = req.userId;

    try {
        await prisma.bid.create({
            data: {
                userId: userId,
                assetId: parseInt(assetId),
                bidAmount: parseInt(bidAmount)
            }
        })

        return res.status(200).json({
            message: "Bid created"
        })

    } catch (err) {
        console.error(err);
    }

    return res.status(500).json({
        message: "Unable to create bid"
    })
}