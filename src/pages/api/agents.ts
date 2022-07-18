import { NextApiRequest, NextApiResponse } from "next"
import { insertWorkMetrics, WorkMetrics } from "../../backend/insertWorkMetrics"

export default (req: NextApiRequest, res: NextApiResponse) => {
  const workMetrics: WorkMetrics = req.body
  try {
    insertWorkMetrics(workMetrics)
  } catch (error) {
    return res.status(404).json(error.message)
  }
  return res.json("ok")
}
