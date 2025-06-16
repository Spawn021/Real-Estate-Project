const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')
const saltRounds = 10
const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds))
}
const generatePropertyName = () => {
  const prefixes = [
    'Green',
    'Sun',
    'Royal',
    'Grand',
    'Sky',
    'Diamond',
    'Central',
    'Lakeview',
    'Elegant',
    'Urban',
    'Serenity',
    'Golden',
  ]

  const suffixes = [
    'Villa',
    'House',
    'Homes',
    'Apartments',
    'Tower',
    'Residence',
    'Townhouse',
    'Place',
    'Heights',
    'Garden',
    'City',
  ]

  const location = faker.location.city()
  const prefix = faker.helpers.arrayElement(prefixes)
  const suffix = faker.helpers.arrayElement(suffixes)

  return `${prefix} ${suffix} ${location}`
}
const listingType = ['SALE', 'RENT']
const roles = [
  {
    code: 'ROLE1',
    value: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: 'ROLE3',
    value: 'Owner',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: 'ROLE5',
    value: 'Agent',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: 'ROLE7',
    value: 'Customer',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
const users = Array.from([...Array(10).keys()]).map((i) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  phone: '0' + faker.string.numeric(9),
  email: faker.internet.email({
    provider: 'gmail.com',
    allowSpecialCharacters: false,
  }),
  address: faker.location.streetAddress({ useFullAddress: true }),
  password: hashPassword('123456'),
  avatar: faker.image.avatar(),
  createdAt: new Date(),
  updatedAt: new Date(),
}))

const userRoles = [
  ...Array.from([...Array(10).keys()]).map((i) => ({
    uid: users[i].id,
    roleCode: 'ROLE7',
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  {
    uid: users[0].id,
    roleCode: 'ROLE1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uid: users[1].id,
    roleCode: 'ROLE3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uid: users[2].id,
    roleCode: 'ROLE5',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uid: users[3].id,
    roleCode: 'ROLE3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uid: users[4].id,
    roleCode: 'ROLE3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
const ownerUserIds = userRoles
  .filter((role) => role.roleCode === 'ROLE3')
  .map((role) => role.uid)
const ownerUsers = users.filter((user) => ownerUserIds.includes(user.id))
const agentUserIds = userRoles
  .filter((role) => role.roleCode === 'ROLE5' || role.roleCode === 'ROLE3')
  .map((role) => role.uid)
const agentUsers = users.filter((user) => agentUserIds.includes(user.id))

const propertyTypes = [
  {
    id: faker.string.uuid(),
    name: 'House',
    image: faker.image.urlLoremFlickr({
      category: 'house',
      width: 640,
      height: 480,
    }),
    description: faker.lorem.sentence({
      min: 2,
      max: 3,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    name: 'Apartment',
    image: faker.image.urlLoremFlickr({
      category: 'apartment',
      width: 640,
      height: 480,
    }),
    description: faker.lorem.sentence({
      min: 2,
      max: 3,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    name: 'Townhouse',
    image: faker.image.urlLoremFlickr({
      category: 'townhouse',
      width: 640,
      height: 480,
    }),
    description: faker.lorem.sentence({
      min: 2,
      max: 3,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
const properties = Array.from([...Array(60).keys()]).map((i) => ({
  id: faker.string.uuid(),
  name: generatePropertyName(),
  description: faker.lorem.paragraph({
    min: 5,
    max: 10,
  }),
  listingType: faker.helpers.arrayElement(listingType),
  price: faker.number.int({ min: 1000000, max: 10000000 }),
  propertyTypeId: faker.helpers.arrayElement(propertyTypes).id,
  owner: faker.helpers.arrayElement(ownerUsers).id,
  status: 'PENDING',
  isAvailable: true,
  images: JSON.stringify(
    Array.from([...Array(faker.number.int({ min: 5, max: 7 })).keys()]).map(
      () =>
        `${faker.image.urlLoremFlickr({
          category: 'city',
          width: 640,
          height: 480,
        })}?random=${faker.string.numeric(30)}`,
    ),
  ),
  featureImage: faker.image.urlLoremFlickr({
    category: 'city',
    width: 640,
    height: 480,
  }),
  address: faker.location.streetAddress({ useFullAddress: true }),
  postedBy: faker.helpers.arrayElement(agentUsers).id,
  bedRoom: faker.number.int({ min: 1, max: 5 }),
  bathRoom: faker.number.int({ min: 1, max: 5 }),
  propertySize: faker.number.int({ min: 50, max: 500 }),
  yearBuilt: faker.number.int({ min: 2000, max: 2025 }),
  createdAt: new Date(),
  updatedAt: new Date(),
}))

const features = [
  {
    id: faker.string.uuid(),
    name: 'Air Conditioning',
    image: faker.image.urlLoremFlickr({
      category: 'airconditioning',
      width: 640,
      height: 480,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    name: 'Furnace',
    image: faker.image.urlLoremFlickr({
      category: 'furnace',
      width: 640,
      height: 480,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    name: 'Pool',
    image: faker.image.urlLoremFlickr({
      category: 'pool',
      width: 640,
      height: 480,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    name: 'Garage',
    image: faker.image.urlLoremFlickr({
      category: 'garage',
      width: 640,
      height: 480,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
const propertyFeatures = []
const usedKeys = []

while (propertyFeatures.length < 160) {
  const property = faker.helpers.arrayElement(properties)
  const feature = faker.helpers.arrayElement(features)

  const key = `${property.id}-${feature.id}`

  if (!usedKeys.includes(key)) {
    usedKeys.push(key)
    propertyFeatures.push({
      propertyId: property.id,
      featureId: feature.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
module.exports = {
  roles,
  users,
  userRoles,
  propertyTypes,
  properties,
  features,
  propertyFeatures,
}
