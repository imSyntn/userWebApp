import React from 'react'
import '../Styles/DataCard.scss'
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";

const DataCard = ({ dataHeading, NAME, PHONE, TYPE, LOCATION, FUNCTION, id }) => {

    const navigate = useNavigate()

    return (
        <div className={`DataCard ${dataHeading ? 'dataHeading' : ''}`}>
            <p>{NAME}</p>
            <p>{PHONE}</p>
            <p>{TYPE}</p>
            <p>{LOCATION}</p>
            <p>{FUNCTION}</p>
            {
                !dataHeading && (
                    <button onClick={()=> navigate(`/edit-user/${id}`)}><FaPencilAlt /></button>
                )
            }
        </div>
    )
}

export default DataCard