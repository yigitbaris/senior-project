import React, { useState } from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

import 'react-calendar/dist/Calendar.css'
import { toast } from 'react-toastify'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs')
    return { data }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const AllJobsContext = createContext()

const Program = () => {
  const { data } = useLoaderData()
  console.log(data)
  return <h1>denemee</h1>
}

export default Program
