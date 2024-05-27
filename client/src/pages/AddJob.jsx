import { FormRow, FormRowSelect, SubmitBtn } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useOutletContext } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { Form, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  console.log(data)

  try {
    await customFetch.post('/jobs', data)
    toast.success('Job added successfully')
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const getCurrentWeekDays = () => {
  const today = new Date()
  const options = { weekday: 'long', month: 'long', day: 'numeric' }
  const currentWeekDays = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000)
    const formattedDate = currentDate.toLocaleDateString('tr-TR', options)
    currentWeekDays.push(formattedDate)
  }

  return currentWeekDays
}

const AddJob = () => {
  const { user } = useOutletContext()
  /* fonksiyondan günü alıyoruz  */
  const currentWeekDays = getCurrentWeekDays()

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>İş Ekle</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            labelText='Pozisyon'
            defaultValue='deneme'
          />
          <FormRow
            type='text'
            name='company'
            labelText='Şirket'
            defaultValue='deneme'
          />
          <FormRow
            type='text'
            labelText='İş Lokasyonu'
            name='jobLocation'
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText='İş Durumu'
            name='jobStatus'
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText='İş Tipi'
            name='jobType'
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <FormRowSelect
            labelText='Select a day'
            name='jobDate'
            list={currentWeekDays} // İçinde bulunduğumuz haftanın günlerini kullan
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
export default AddJob
