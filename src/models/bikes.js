const uuid = require('uuid/v4')
const bikes = require('../../db/bikes')

const getAll = () => bikes

const getOne = id => bikes.find(e => e.id == id)

const create = (body) => {
  const errors = []
  const brand = body.brand
  const type = body.type
  const year = body.year
  const condition = body.condition

  if (!brand || !type || !year || !condition) {
    errors.push('Additional Information Required')
    response = {errors}
  } else {
    const bike = {id: uuid(), brand, type, year, condition}
    bikes.push(bike)
    response = bike
  }
  return response
}

const updateOne = (id, body) => {
  const errors = []
  const brand = body.brand
  const type = body.type
  const year = body.year
  const condition = body.condition
  const newBike = bikes.find(bike => bike.id == id)

  if (!brand || !type || !year || !condition) {
    errors.push('Additional Information Required')
    response = {errors}
  } else {
    newBike.brand = brand
    newBike.type = type
    newBike.year = year
    newBike.condition = condition
    response = newBike
  }
  return response
}

const deleteOne = (id) => {
  const errors = []
  const toDelete = bikes.find(e => e.id === id)
  if (!toDelete) {
    errors.push('ID Not Found');
    response = {errors}
  } else {
    const index = bikes.indexOf(toDelete)
    const spliced = bikes.splice(index, 1)
    response = spliced
  }
  return response
}

module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne
}
