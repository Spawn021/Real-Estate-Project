const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')
const redis = require('../config/redis.config')

const createNewPropertyType = asyncHandler(async (req, res) => {
  const { name } = req.body
  const response = await db.PropertyType.findOrCreate({
    where: { name },
    defaults: req.body,
  })

  return res.status(201).json({
    success: response[1],
    message: response[1]
      ? 'Property Type created successfully'
      : 'Property Type already exists',
    propertyType: response[0],
  })
})

const getPropertyTypes = asyncHandler(async (req, res) => {
  const { limit, page, fields, name, sort, ...query } = req.query
  const options = {}
  if (fields) {
    const attributes = fields.split(',')
    const isExclude = attributes.some((attr) => attr.startsWith('-'))
    options.attributes = isExclude
      ? { exclude: attributes.map((attr) => attr.replace('-', '')) }
      : attributes
  }
  if (name) query.name = { [db.Sequelize.Op.iLike]: `%${name}%` }

  if (!limit) {
    const cachedPropertyTypes = await redis.get('propertyTypes')
    if (cachedPropertyTypes) {
      const parsedPropertyTypes = JSON.parse(cachedPropertyTypes)
      return res.status(200).json({
        success: parsedPropertyTypes.length > 0,
        message:
          parsedPropertyTypes.length > 0
            ? 'Property Types fetched successfully'
            : 'No Property Types found',
        propertyTypes: parsedPropertyTypes,
      })
    }
    const response = await db.PropertyType.findAll({
      where: query,
      ...options,
    })
    redis.set('propertyTypes', JSON.stringify(response))
    return res.status(200).json({
      success: response.length > 0,
      message:
        response.length > 0
          ? 'Property Types fetched successfully'
          : 'No Property Types found',
      propertyTypes: response,
    })
  }
  if (sort) {
    const sortFields = sort.split(',')
    options.order = sortFields.map((field) => {
      const isDesc = field.startsWith('-')
      return [field.replace('-', ''), isDesc ? 'DESC' : 'ASC']
    })
  }
  const offset = (page - 1) * limit || 0

  const response = await db.PropertyType.findAndCountAll({
    where: query,
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10),
    ...options,
  })

  const totalPages = Math.ceil(response.count / limit)
  return res.status(200).json({
    success: response.rows.length > 0,
    message:
      response.rows.length > 0
        ? 'Property Types fetched successfully'
        : 'No Property Types found',
    propertyTypes: response.rows,
    totalCount: response.count,
    totalPages,
    currentPage: page ? parseInt(page, 10) : 1,
  })
})

const updatePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  if (Object.keys(req.body).length === 0) {
    return throwErrorWithStatus(400, 'Missing inputs', res, next)
  }
  const propertyType = await db.PropertyType.findByPk(id)
  if (!propertyType) {
    return throwErrorWithStatus(404, 'Property Type not found', res, next)
  }
  const updatedPropertyType = await propertyType.update(req.body)
  return res.status(200).json({
    success: true,
    message: 'Property Type updated successfully',
    propertyType: updatedPropertyType,
  })
})

const deletePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const propertyType = await db.PropertyType.findByPk(id)
  if (!propertyType) {
    return throwErrorWithStatus(404, 'Property Type not found', res, next)
  }
  await propertyType.destroy()
  return res.status(200).json({
    success: true,
    message: 'Property Type deleted successfully',
  })
})

module.exports = {
  createNewPropertyType,
  getPropertyTypes,
  updatePropertyType,
  deletePropertyType,
}
