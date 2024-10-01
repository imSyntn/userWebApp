import React, { useState } from 'react'
import '../Styles/Main.scss'
import DataCard from './DataCard'

const Main = ({ usersInfo }) => {

    const [emailSearch, setEmailSearch] = useState('')
    const [singleData, setSingleData] = useState(null)

    const filteredUserInfo = usersInfo.filter(item => item.email.includes(emailSearch))

    return (
        <main>
            <div className="searchContainer">
                <input type="text" placeholder='Search for email' onChange={(e) => setEmailSearch(e.target.value)} value={emailSearch} />
                {
                    (!emailSearch && singleData) && (
                        <span onClick={()=> {
                            setEmailSearch('')
                            setSingleData(null)
                        }}>Reset</span>
                    )
                }
                {
                    emailSearch && (
                        <div className="autoComplete">
                            {
                                (filteredUserInfo.length > 0) ? (
                                    filteredUserInfo.map(item => (
                                        <p className="filtered" key={item.email} onClick={() => {
                                            setEmailSearch('')
                                            setSingleData(item)
                                        }}>{item.firstName + " " + item.lastName}</p>
                                    ))
                                ) : (
                                    <p>No users available.</p>
                                )
                            }
                        </div>
                    )
                }
            </div>
            <div className="data">
                <DataCard dataHeading={true} NAME={'NAME'} PHONE={'PHONE'} TYPE={'TYPE'} LOCATION={'LOCATION'} FUNCTION={'FUNCTION'} />

                {
                    (usersInfo.length > 0 && !singleData) ? (
                        usersInfo.map(item => (
                            <DataCard key={item.email} dataHeading={false} NAME={item.firstName + " " + item.lastName} PHONE={item.phone} TYPE={item.role} LOCATION={item.location} FUNCTION={item.department} id={item.id} />
                        ))
                    ) :
                        (singleData) ? (
                            <DataCard key={singleData.email} dataHeading={false} NAME={singleData.firstName + " " + singleData.lastName} PHONE={singleData.phone} TYPE={singleData.role} LOCATION={singleData.location} FUNCTION={singleData.department} id={singleData.id} />
                        ) : (
                            (
                                <p className='NoUsers'>Add users to continue.
                                    {/* {(emailSearch && filteredUserInfo.length == 0) ? 
                                    "No users available." : 
                                    "Add users to continue."
                                    } */}
                                </p>
                            )
                        )
                }
            </div>
        </main>
    )
}

export default Main