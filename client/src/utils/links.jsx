import React from 'react'
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { FaBeer } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'

import { ImProfile } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'

import { MdOutlineTry } from 'react-icons/md'

const links = [
  {
    text: 'home',
    path: '.',
    icon: <FaHouse />,
  },
  {
    text: 'add job',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    text: 'all jobs',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    text: 'admin',
    path: 'admin',
    icon: <MdAdminPanelSettings />,
  },
  {
    text: 'program',
    path: 'program',
    icon: <MdOutlineTry />,
  },
]

export default links
