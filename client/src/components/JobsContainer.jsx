import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'

const JobsContainer = () => {
  const { data } = useAllJobsContext()
  const { jobs } = data

  const sortedData = jobs.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )
  console.log(sortedData)

  const currentDate = new Date()

  // Haftanın başlangıç tarihini bul
  const firstDayOfWeek = new Date(currentDate)
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDate.getDay())

  // Haftanın bitiş tarihini bul
  const lastDayOfWeek = new Date(currentDate)
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (6 - currentDate.getDay()))

  // Haftanın işlerini filtrele
  const jobsInCurrentWeek = jobs.filter((job) => {
    const createdAtDate = new Date(job.createdAt)
    return createdAtDate >= firstDayOfWeek && createdAtDate <= lastDayOfWeek
  })

  console.log(jobsInCurrentWeek)

  if (sortedData.length === 0) {
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
        {jobsInCurrentWeek.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}
export default JobsContainer
