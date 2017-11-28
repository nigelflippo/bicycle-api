const express = require('express')
const router = express.Router()
const control = require('../controllers/bikes')

router.get('/', control.getAll)
router.get('/:id', control.getOne)
router.post('/', control.create)
router.put('/:id', control.updateOne)
router.delete('/:id', control.deleteOne)

module.exports = router
