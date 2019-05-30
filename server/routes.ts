import { Router } from "express"

const router = Router()

router.get("/api/random-data", async (req, res, next) => {
  res.send({}).end()
})

export default router
