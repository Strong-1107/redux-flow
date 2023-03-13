import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../reducers/userLoginSlice'
import { saveState } from '../helpers/localStorage'
import logo from '../images/logo.png'
import { emptySkillsDB } from '../reducers/selectedSkillsSlice'
import ProgressBar from './ProgressBar/ProgressBar'
import { selectCompletedExperiencesByHelperId } from '../reducers/experiencesSlice'

export const Navbar = (props) => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState('/')
  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  }
  const userExperiences = useSelector((state) => selectCompletedExperiencesByHelperId(state, user.id))
  const experience = userExperiences.length * 12
  useEffect(() => {
    if (user === null || user === undefined) {
      setCurrentPage('login')
    }
  }, [user])

  const onDashboardClicked = () => {
    setCurrentPage('dashboard')
    dispatch(emptySkillsDB())
  }

  return (
    <div className='bg-gray-50'>
      <nav className="fixed top-0 inset-x-0 z-50 h-16 text-white bg-white border-b-2 font-medium flex justify-between items-center py-2">
        <div className="flex lg:justify-center items-center ml-12">
          <Link onClick={() => (setCurrentPage('dashboard'))} to="/dashboard">
            <img width="" className="h-12" src={logo} alt="freeflow logo"></img>
          </Link>
        </div>
        <div className='mr-4 xl:mr-12'>
          <ProgressBar experience={experience} />
        </div>
      </nav>
      <aside id="default-sidebar" className="fixed top-10 bg-gray-50 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <section className="h-full px-8 py-4 bg-gray-50 dark:bg-gray-800">
            {/* <div className="col-start-10 lg:hidden z-50 flex justify-end items-center mr-4">
              <DropDown user={user} saveState={saveState} handleLogout={handleLogout} />
            </div> */}

            <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
              <Link onClick={() => (onDashboardClicked())} className="" to="/dashboard">
                <div href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                  <span className="ml-3">Feed</span>
                </div>
              </Link>

              <Link onClick={() => (setCurrentPage('users'))} className="" to="/users">
                <div href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </div>
              </Link>

              <Link className="" to={`/userprofile/${user?.id}`} onClick={() => {
                saveState(user?.id)
                setCurrentPage('profile')
              }}>
                <div href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                </div>
              </Link>

              <Link className="" to={`/${user?.id}/experiences`} onClick={() => {
                saveState(user?.id)
                setCurrentPage('experiences')
              }}>
                <div href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Experiences</span>
                </div>
              </Link>

              <Link className="" to={'/messages'} onClick={() => {
                saveState(user?.id)
                setCurrentPage('messages')
              }}>
                <div href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                </div>
              </Link>

              <div className="">
              {!user
                ? <Link to="/login">
                  <div href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Login</span>
                  </div>
                </Link>
                : <button className="font-bold" onClick={() => {
                  handleLogout()
                  setCurrentPage('login')
                }}>
                  <div href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                  </div>
                </button>
              }

              </div>
            </div>
        </section>
      </aside>
    </div>
  )
}
