import { useState, useEffect } from 'react'
import '../Styles/AddEdit.scss'
import { useNavigate, useParams } from 'react-router-dom';

const formDataArray = [{
    label: 'First name',
    key: 'firstName',
}, {
    label: 'last name',
    key: 'lastName',
}, {
    label: 'phone',
    key: 'phone',
}, {
    label: 'email id',
    key: 'email',
}, {
    label: 'role',
    key: 'role',
}, {
    label: 'location',
    key: 'location',
}, {
    label: 'department',
    key: 'department',
}
]

const AddEdit = ({ addUser, usersInfo, setUsersInfo }) => {

    const navigate = useNavigate()

    const { userID } = useParams()

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        role: '',
        location: '',
        department: '',
        id: ''
    })
    const [error, setError] = useState({})

    const index = userID ? usersInfo.findIndex(item => item.id == userID) : null

    useEffect(() => {
        if (userID && usersInfo[index]) {
            setUserData({
                firstName: usersInfo[index].firstName,
                lastName: usersInfo[index].lastName,
                phone: usersInfo[index].phone,
                email: usersInfo[index].email,
                role: usersInfo[index].role,
                location: usersInfo[index].location,
                department: usersInfo[index].department
            })
        }
    }, [])

    useEffect(() => {
        setUserData(prev => ({ ...prev, id: `${Math.floor(Math.random() * 1000) + userData.phone}` }))
    }, [userData.phone])

    const changeEvent = (e, key) => {
        // if()
        setUserData(prev => ({ ...prev, [key]: e.target.value }))
    }

    const validateInput = () => {
        const newErrors = {};
        if (!userData.email.includes('.') || !userData.email.includes('@')) {
            newErrors.email = 'Invalid email.';
        }
        const validNumber = userData.phone.length === 10 && !isNaN(userData.phone);
        if (!validNumber) {
            newErrors.phone = 'Invalid phone number.';
        }
        if(usersInfo.find(item=> item.email == userData.email)) {
            newErrors.email = 'Email must be unique.'
        }
    
        return newErrors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateInput();
        setError(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        if (!userID) {
            addUser(userData);
            console.log(userData);
        } else {
            const dataArray = [...usersInfo];
            dataArray[index] = userData;
            setUsersInfo(dataArray);
        }
        navigate('/');
    };
    

    return (
        <div className='AddEdit'>
            <p>{!userID ? 'Add user' : 'Edit user'}</p>
            <form onSubmit={handleSubmit}>
                {
                    formDataArray.map(item => (
                        <InputBox name={item.label} key={item.label} changeEvent={changeEvent} userKey={item.key} value={userData[item.key]} error={error[item.key]} />
                    ))
                }
                <div className="btns">
                    <button type='submit'>Confirm</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddEdit

const InputBox = ({ name, changeEvent, value, userKey, error }) => {
    return (
        <div className="inputBox">
            <div className="lbl">
                <label htmlFor={name}>{name}</label>
                <span>*</span>
            </div>
            {
                error && <p>{error}</p>
            }
            <input type={(userKey === 'email') ? 'email' : 'text'} onChange={(e) => changeEvent(e, userKey)} value={value} required={true} />
        </div>
    )
}