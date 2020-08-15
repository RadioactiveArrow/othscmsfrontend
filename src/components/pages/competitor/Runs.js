import React from 'react';
import RunCard from '../../RunCard'
import '../../../styles/content.css'

const Runs = () => {
  return (
    <div className="content">
      <h2 className="subtitle">Questions Submitted: 0</h2>
      <h1 className="title">Runs</h1>
      <div className="runs_div">
        <RunCard fileName="TestFile.java" problemName="Problem #1" status="error" msg="Syntax Error" />
        <RunCard fileName="OtherFile.java" problemName="Another Problem" status="pending"/>
        <RunCard fileName="GoodFile.java" problemName="Easy Problem" status="accepted" />
      </div>
    </div>
  )
}

export default Runs
