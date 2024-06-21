import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import day from 'dayjs'
import WeekOfYear from 'dayjs/plugin/weekOfYear'
import advanceFormat from 'dayjs/plugin/advancedFormat'
day.extend(advanceFormat)
day.extend(WeekOfYear)

const JobsContainer = () => {
  const { data } = useAllJobsContext()
  const { jobs } = data

  function convertToDate(dateString) {
    const months = {
      Ocak: 0,
      Şubat: 1,
      Mart: 2,
      Nisan: 3,
      Mayıs: 4,
      Haziran: 5,
      Temmuz: 6,
      Ağustos: 7,
      Eylül: 8,
      Ekim: 9,
      Kasım: 10,
      Aralık: 11,
    }

    const parts = dateString.split(' ')
    const day = parseInt(parts[0], 10)
    const month = months[parts[1]]
    const year = new Date().getFullYear()
    return new Date(year, month, day)
  }

  const filteredJobs = jobs.sort((a, b) => {
    const dateA = convertToDate(a.jobDate)
    const dateB = convertToDate(b.jobDate)
    return dateA - dateB
  })

  return (
    <Wrapper>
      <div className='jobs'>
        {filteredJobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}
export default JobsContainer
