import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { useLoaderData, redirect } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import Wrapper from '../assets/wrappers/StatsContainer'
import { toast } from 'react-toastify'
import { StatItem } from '../components'

export const loader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats')
    return response.data
  } catch (error) {
    toast.error('You ara not authorized to view this page')
    return redirect('/dashboard')
  }
}
const Admin = () => {
  const { users, jobs } = useLoaderData()

  const handleButtonClick = async () => {
    try {
      const response = await customFetch.get('users/admin/nobet-ata')
      // const response = await customFetch.get('users/current-user')
      console.log(response.data)
    } catch (error) {
      toast.error('You are not authorized to view this page')
      return redirect('/dashboard')
    }
  }

  return (
    <>
      <Wrapper>
        <StatItem
          title='güncel kullanıcılar'
          count={users}
          color='#e9b949'
          bcg='#fcefc7'
          icon={<FaSuitcaseRolling />}
        />
        <StatItem
          title='toplam işler'
          count={jobs}
          color='#647acb'
          bcg='#e0e8f9'
          icon={<FaCalendarCheck />}
        />
      </Wrapper>
      <div style={{ marginTop: 100, display: 'grid' }}>
        <div style={{ marginBottom: 50, fontSize: 25 }}>
          Lütfen nöbetleri atamak için basınız.
        </div>
        <button
          style={{
            height: 50,
            width: 200,
            color: 'white',
            fontSize: 20,
            borderRadius: 20,
            backgroundColor: '#36a4c0',
            borderColor: '#36a4c0',
          }}
          onClick={handleButtonClick}
        >
          Nöbet ata
        </button>
      </div>
    </>
  )
}

export default Admin
