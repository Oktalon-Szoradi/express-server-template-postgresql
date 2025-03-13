import * as model from '../models/myModel.js'

export const getStuff = async (req, res) => {
  const { sort } = req.query

  const stuff = await model.getStuffDb(sort)

  return res.status(200).json(stuff)
}

export const addStuff = async (req, res) => {
  const { myColumn, myOtherColumn } = req.body

  const result = await model.addStuffDb(myColumn, myOtherColumn)

  return res.status(201).json(result)
}

export const updateStuff = async (req, res) => {
  const { id } = req.params
  const { myColumn, myOtherColumn } = req.body
  console.log(typeof id)

  const result = await model.updateStuffDb(id, myColumn, myOtherColumn)

  return res.status(200).json(result)
}

export const deleteStuff = async (req, res) => {
  const { id } = req.params

  const result = await model.deleteStuffDb(id)

  return res.status(200).json(result)
}
