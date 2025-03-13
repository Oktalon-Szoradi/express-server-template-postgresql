import * as model from '../models/testModel.js'

export const getTest = async (req, res) => {
  const test = await model.getTestDb()

  return res.status(200).json(test)
}
