import { path } from './path'
import { MdDashboard } from 'react-icons/md'
import { FaHouse } from 'react-icons/fa6'
import { FaHouseChimneyMedical } from 'react-icons/fa6'
import { BsHouseGearFill } from 'react-icons/bs'

export const navigations = [
  {
    id: 1,
    path: '/',
    text: 'HOME',
  },
  {
    id: 2,
    path: `/${path.PROPERTIES}`,
    text: 'PROPERTIES',
  },
  {
    id: 3,
    path: `/${path.OUR_AGENTS}`,
    text: 'OUR AGENTS',
  },
  {
    id: 4,
    path: `/${path.ABOUT_US}`,
    text: 'ABOUT US',
  },
]

export const adminSidebar = [
  {
    id: 1,
    name: 'Dashboard',
    path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
    icon: <MdDashboard />,
    type: 'SINGLE',
  },
  {
    id: 2,
    name: 'Property Type',
    path: '',
    icon: <FaHouse />,
    type: 'PARENT',
    children: [
      {
        id: 21,
        name: 'Create',
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
        type: 'SINGLE',
        icon: <FaHouseChimneyMedical />,
      },
      {
        id: 22,
        name: 'Manage',
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
        type: 'SINGLE',
        icon: <BsHouseGearFill />,
      },
    ],
  },
]

export const menuItems = [
  {
    id: 1,
    name: 'Personal Information',
    code: 'ROLE7',
    path: `/${path.USER_LAYOUT}/${path.PERSONAL}`,
  },
  {
    id: 2,
    name: 'Agent',
    code: 'ROLE5',
    path: `/${path.AGENT_LAYOUT}/${path.AGENT_LAYOUT}`,
  },
  {
    id: 3,
    name: 'Owner',
    code: 'ROLE3',
    path: `/${path.OWNER_LAYOUT}/${path.OWNER_DASHBOARD}`,
  },
  {
    id: 4,
    name: 'Admin',
    code: 'ROLE1',
    path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`,
  },
]
