const asyncHandler = require('express-async-handler')
const db = require('../models')
const { throwErrorWithStatus } = require('../middlewares/errorHandler')
const redis = require('../config/redis.config')
const qs = require('qs')

const createProperty = asyncHandler(async (req, res) => {
  const { phone, name, password, role } = req.body

  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: req.body,
  })

  return res.status(201).json({
    success: response[1],
    message: response[1] ? 'User registered successfully' : 'Phone Number already exists',
  })
})

const getProperties = asyncHandler(async (req, res) => {
  const { limit, page, fields, address, sort, price, ...query } = qs.parse(req.query)
  const options = {}
  if (fields) {
    const attributes = fields.split(',')
    const isExclude = attributes.some((attr) => attr.startsWith('-'))
    options.attributes = isExclude
      ? { exclude: attributes.map((attr) => attr.replace('-', '')) }
      : attributes
  }
  if (address) query.address = { [db.Sequelize.Op.iLike]: `%${address}%` }
  if (price) {
    if (price.gte) {
      query.price = { ...query.price, [db.Sequelize.Op.gte]: price.gte }
    }
    if (price.lte) {
      query.price = { ...query.price, [db.Sequelize.Op.lte]: price.lte }
    }
  }
  if (!limit) {
    const cachedProperties = await redis.get('properties')
    if (cachedProperties) {
      const parsedProperties = JSON.parse(cachedProperties)
      return res.status(200).json({
        success: parsedProperties.length > 0,
        message:
          parsedProperties.length > 0
            ? 'Properties fetched successfully'
            : 'No property found',
        properties: parsedProperties,
      })
    }
    const response = await db.Property.findAll({
      where: query,
      ...options,
    })
    redis.set('properties', JSON.stringify(response))
    return res.status(200).json({
      success: response.length > 0,
      message:
        response.length > 0 ? 'Property fetched successfully' : 'No property found',
      properties: response,
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

  const response = await db.Property.findAndCountAll({
    where: query,
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10),
    ...options,
    include: [
      {
        model: db.PropertyType,
        as: 'propertyType',
        attributes: ['name', 'image', 'description'],
      },
      {
        model: db.User,
        as: 'ownerUser',
        attributes: ['avatar', 'name', 'phone', 'email'],
      },
      {
        model: db.User,
        as: 'postedByUser',
        attributes: ['avatar', 'name', 'phone', 'email'],
      },
    ],
  })

  const totalPages = Math.ceil(response.count / limit)
  return res.status(200).json({
    success: response.rows.length > 0,
    message:
      response.rows.length > 0 ? 'Properties fetched successfully' : 'No property found',
    properties: response.rows,
    meta: {
      totalCount: response.count,
      totalPages,
      currentPage: page ? parseInt(page, 10) : 1,
    },
  })
})

const getPropertyById = asyncHandler(async (req, res) => {
  const { pid } = req.params
  if (!pid) {
    return throwErrorWithStatus('Property ID is required', 400)
  }
  const cachedProperty = await redis.get(`property:${pid}`)
  if (cachedProperty) {
    const parsedProperty = JSON.parse(cachedProperty)
    return res.status(200).json({
      success: true,
      message: 'Property fetched successfully',
      property: parsedProperty,
    })
  }
  const response = await db.Property.findByPk(pid, {
    include: [
      {
        model: db.PropertyType,
        as: 'propertyType',
        attributes: ['name', 'image', 'description'],
      },
      {
        model: db.User,
        as: 'ownerUser',
        attributes: ['avatar', 'name', 'phone', 'email'],
      },
      {
        model: db.User,
        as: 'postedByUser',
        attributes: ['avatar', 'name', 'phone', 'email'],
      },
    ],
  })
  if (!response) {
    return throwErrorWithStatus('Property not found', 404)
  }
  redis.set(`property:${pid}`, JSON.stringify(response))
  return res.status(200).json({
    success: true,
    message: 'Property fetched successfully',
    property: response,
  })
})
module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
}
