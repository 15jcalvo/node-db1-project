const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  if (!req.body.name || !req.body.budget) {
    next({ status: 400, message: "name and budget are required" })
  } else if (req.body.name.length < 3 || req.body.name.length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" })
  } else if (!parseFloat(req.body.budget)) {
    next({ status: 400, message: "budget of account must be a number" })
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    next({ status: 400, message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const nameCheck = await db('accounts').where('name', req.body.name)
  if (nameCheck) {
    next({ status: 400, message: "that name is taken" })
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  const idCheck = await db('accounts').where('id', req.params.id).first()
  if (!idCheck) {
    next({ status: 404, message: "account not found" })
  } else {
    next()
  }
}

