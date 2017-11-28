const model = require('../models/bikes')

const getAll = (req, res, next) => {
  const data = model.getAll()
  res.status(200).json({data})
}

const getOne = (req, res, next) => {
  const data = model.getOne(req.params.id)
  if (!data) return next({status: 404, message: `Could not find id: ${req.params.id}`})
  res.status(200).json({data})
}

const create = (req, res, next) => {
  const result = model.create(req.body)

  if (result.errors) {
    return next({ status: 400, message: `Fields are required`, errors: result.errors })
  }
  res.status(201).json({data: result})
}

const updateOne = (req, res, next) => {
  const result = model.updateOne(req.params.id, req.body)

  if (result.errors) return next({ status: 400, message: `Fields are required`, errors: result.errors })

  res.status(200).json({ data: result })
}
const deleteOne = (req, res, next) => {
  const result = model.deleteOne(req.params.id)
  if (result.errors) {
    return next({status: 404, message: `Could not find ${req.params.id}`, errors: result.errors})
  }
  res.status(204).json()
}

module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne
}
