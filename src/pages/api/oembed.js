import { getOembed } from "@app/utils/functions/getOembed"

const handler = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).json({ success: false })

    const format = req.query.format
    const videoId = req.query.id

    try {
        if (format === 'json') {
            return res.json(await getOembed(videoId, format))
        }
        if (format === 'xml') {
            return res
                .setHeader('Content-Type', 'application/xml')
                .send(await getOembed(videoId, format))
        }
        return null
    } catch (error) {
        return null
    }
}

export default handler