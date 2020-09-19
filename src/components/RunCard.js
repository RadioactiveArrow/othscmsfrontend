import React from 'react';
import warn from '../assets/warn.svg'
import check from '../assets/check.svg'
import '../styles/card.css'


const RunCard = ({ fileName, problemName, status, msg }) => {
  return (
    <div className={`card ${status}`}>
      <h1>
        {fileName}
      </h1>
      <h2>
        {problemName}
      </h2>
      <div className={`msg-ctr ${status}`}>
        {status == "error" && <img className="icon" src={warn} />}
        {status == "accepted" && <img className="icon" src={check} />}
        <h3>
          {status == "error" && `Rejected: ${msg}`}
          {status == "pending" && `Pending`}
          {status == "accepted" && `Accepted`}
        </h3>
      </div>
    </div>
  )
}
export default RunCard

