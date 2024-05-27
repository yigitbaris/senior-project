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
    text: 'ana sayfa',
    path: '.',
    icon: <FaHouse />,
  },
  {
    text: 'iş ekle',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    text: 'tüm işler',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    text: 'istatistikler',
    path: 'stats',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'profil',
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
