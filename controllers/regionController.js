const {Region} = require('../models')

class RegionController {
    static async getRegions(req, res, next) {
        try {
            let regionList = await Region.findAll()
            res.status(200).json(regionList)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RegionController