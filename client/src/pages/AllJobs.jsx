import { toast } from 'react-toastify'
import { JobsContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs')
    // const denemelikData = await customFetch.get('/users/admin/nobet-ata')
    // console.log(denemelikData.data)
    return { data }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllJobsContext = createContext()

const AllJobs = () => {
  const { data } = useLoaderData()
  return (
    <AllJobsContext.Provider value={{ data }}>
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs
