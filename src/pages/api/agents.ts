import { NextApiRequest, NextApiResponse } from "next"
import { insertWorkMetrics, WorkMetrics } from "../../backend/insertWorkMetrics"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const workMetrics: WorkMetrics = req.body
  await insertWorkMetrics(workMetrics)
  return res.send("OK")
}
