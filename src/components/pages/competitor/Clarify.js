import React, { useState, useEffect } from 'react';
import ClarificationCard from '../../ClarificationCard'
import '../../../styles/content.css'

const Clarify = () => {
    return (
		<div className="content">
			<h2 className="subtitle">Pending Clarifications: 0</h2>
			<h1 className="title">Clarifications</h1>
            <div className="clarifications_div">
                <ClarificationCard problemName="Problem #1" author="team5427" questionText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, doloribus. Suscipit necessitatibus officiis saepe fugiat, dignissimos iure quaerat modi id!"/>
                <ClarificationCard problemName="Another Problem" author="team420" questionText="This is filler text that would be problem text at some point but it isnt right now" response="Wow what a question! That was a question you asked!"/>
            </div>
		</div>
	)
}

export default Clarify
