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

  /* tarihe göre sıralama */
  const sortedData = jobs.sort(
    (a, b) => new Date(a.jobDate) - new Date(b.jobDate)
  )

  const jobDateCounts = {}

  // Jobs'u filtrele ve her jobDate değeri için maksimum 2 iş göster
  const filteredJobs = sortedData.filter((job) => {
    if (!jobDateCounts[job.jobDate]) {
      jobDateCounts[job.jobDate] = 1
      return true
    } else if (jobDateCounts[job.jobDate] < 2) {
      jobDateCounts[job.jobDate]++
      return true
    }
    return false
  })

  //if the job in the same week
  const checkSameWeek = filteredJobs.filter((job) => {
    const today = new Date()
    const weekOfToday = day(today).week()
    if (day(job.jobDate).week() !== weekOfToday) {
      return false
    }
    return true
  })

  // if (checkSameWeek.length === 0) {
  //   return (
  //     <Wrapper>
  //       <h2>No jobs to display...</h2>
  //     </Wrapper>
  //   )
  // }

  return (
    <Wrapper>
      <div className='jobs'>
        {/* filteredJobs.map((job) tüm işleri sırasına göre bastırır */}
        {filteredJobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}
export default JobsContainer
