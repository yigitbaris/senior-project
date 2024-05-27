import { Link, Form, redirect, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo, SubmitBtn } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
  const navigate = useNavigate()

  const loginDemoUser = async () => {
    const data = {
      email: 'test@gmail.com',
      password: 'secret123',
    }
    try {
      await customFetch.post('/auth/login', data)
      toast.success('Take a test drive')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Giris</h4>
        <FormRow type='email' name='email' defaultValue='baris@gmail.com' />
        <FormRow
          type='password'
          name='password'
          labelText='sifre'
          defaultValue='secret123'
        />
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          uygulamayı kesfet
        </button>
        <p>
          Henüz Üye Değil misin?
          <Link to='/register' className='member-btn'>
            Kaydol
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
export default Login
