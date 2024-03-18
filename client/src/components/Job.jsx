import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link, Form } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import day from 'dayjs'
import advanceFormat from 'dayjs/plugin/advancedFormat'
day.extend(advanceFormat)

import { useDashboardContext } from '../pages/DashboardLayout'

/*
Job tuşlarını admin şartıyla gösterme
 */

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
  jobDate,
}) => {
  const { user } = useDashboardContext() || {}
  const { role } = user
  const date = day(createdAt).format('MMM Do,YYYY')

  /* deneme alanı  */
  const dayName = day(createdAt).format('dddd')
  // console.log(dayName)
  /* deneme alanı  */

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          {/* <JobInfo icon={<FaCalendarAlt />} text={date + ' ' + dayName} /> */}
          <JobInfo icon={<FaCalendarAlt />} text={jobDate} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        {/* if user is admin condition  !!!!! */}

        {role === 'admin' && (
          <footer className='actions'>
            <Link to={`../edit-job/${_id}`} className='btn edit-btn'>
              Edit
            </Link>
            <Form method='post' action={`../delete-job/${_id}`}>
              <button type='submit' className='btn delete-btn'>
                Delete
              </button>
            </Form>
          </footer>
        )}
      </div>
    </Wrapper>
  )
}
export default Job
