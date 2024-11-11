const { prisma } = require('../config');
const { assetSchema } = require('../validations/assetSchemas');

exports.createAsset = async (req, res) => {

    const parseResponse = assetSchema.safeParse(req.body);
    if(!parseResponse.success) {
        return res.status(400).json({
            message: "Invalid User Input",
            issues: parseResponse.error.issues.map((issue) => (issue.message))
        })
    }

    const { title, description, startingPrice } = req.body;
    const userId = req.userId;

    try {
        const newAsset = await prisma.asset.create({
            data: {
                sellerId: userId,
                title: title,
                description: description,
                startingPrice: startingPrice,
                currentPrice: startingPrice
            }
        })

        return res.status(200).json({
            message: "Asset Created Successfully!",
            assetId: newAsset.id
        })

    } catch (err) {
        console.log(err);
    }

    return res.status(500).json({
        mesage: "Unable to create asset"
    })
}

exports.findAllActive = async (req, res) => {
    try {
        const allActiveAssets = await prisma.asset.findMany({
            where: { status: 'active'}
        });

        return res.status(200).json({
            allActiveAssets: allActiveAssets
        });

    } catch (err) {
        console.error(err);
    }

    return res.status(500).json({
        message: "Unable to get all assets"
    })
}