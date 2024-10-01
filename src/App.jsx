import { useState, createContext } from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import AddEdit from './Components/AddEdit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  // const [addClicked, setAddClicked] = useState({
  //   show: false,
  //   addData: true,
  //   editDataObj: undefined
  // })

  const [usersInfo, setUsersInfo] = useState([])

  // const showModal = () => {
  //   setAddClicked({
  //     show: true,
  //     addData: true,
  //     editDataObj: undefined
  //   })
  // }

  // const editData = (email) => {
  //   const editingObj = usersInfo.find(item => item.email == email)
  //   setAddClicked({
  //     show: true,
  //     addData: false,
  //     editDataObj: editingObj
  //   })
  // }

  // const hideModal = () => {
  //   setAddClicked({
  //     show: false,
  //     addData: true,
  //     editDataObj: undefined
  //   })
  // }

  const addUser = (obj) => {
    setUsersInfo(prev => ([...prev, obj]))
  }

  return (
    <BrowserRouter>
      {/* {
        addClicked.show && (
          <AddEdit action={addClicked.addData} addUser={addUser} hideModal={hideModal} editDataObj={addClicked.editDataObj} usersInfo={usersInfo} setUsersInfo={setUsersInfo} />
        )
      } */}
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Main usersInfo={usersInfo} setUsersInfo={setUsersInfo} />
          </>
        } />

        <Route path='/add-user' element={<AddEdit addUser={addUser} usersInfo={usersInfo} setUsersInfo={setUsersInfo} />} />

        <Route path='/edit-user/:userID' element={<AddEdit addUser={addUser} usersInfo={usersInfo} setUsersInfo={setUsersInfo} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
