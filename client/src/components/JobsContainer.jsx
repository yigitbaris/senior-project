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

  const date = day(jobs.jobDate)
  console.log(date)

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

  if (filteredJobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className='jobs'>
        {/* sortedData.map((job) tüm işleri sırasına göre bastırır */}
        {filteredJobs.map((job) => {
          console.log(day(jobs.jobDate).week())
          return <Job key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}
export default JobsContainer
