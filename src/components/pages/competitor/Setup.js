import React, { useState, useEffect } from 'react';
import '../../../styles/content.css'
import { useAuth } from '../../AuthProvider';
const Setup = () => {
	//Default error status
	const initError = {
		"classes": "none",
		"msg": "Bruh Moment!"
	}

	//Loads authentication from context
	const { authenticated, team_data, setTeamData } = useAuth()

	//State variables (memeber names, school, error)
	const [member1, setMember1] = useState("")
	const [member2, setMember2] = useState("")
	const [member3, setMember3] = useState("")
	const [school, setSchool] = useState("")
	const [err, setErr] = useState(false)
	const [sub, setSub] = useState(false)

	useEffect(() => {
		setVars()
	}, [team_data])

	const setVars = () => {
		if (team_data) {
			const { member1, member2, member3, school } = team_data
			setMember1(member1)
			setMember2(member2)
			setMember3(member3)
			setSchool(school)
		}
	}

	const formCallback = () => {
		setSub(true)
	}

	const formHandler = (e) => {
		e.preventDefault();
		if (member1 && school) {
			setTeamData(member1, member2, member3, school, formCallback)
		} else {
			setErr({
				"nameError": !member1,
				"schoolError": !school,
				"msg": !member1 ? "Error: A team must have at least 1 member!" : "Error: You must select a school!"
			})
			setSub(false)
		}
	}

	//Renders Setup Page
	return (
		<div className="content" onClick={() => setErr(false)}>
			<h2 className="subtitle">Hello!</h2>
			<h1 className="title">Team Setup</h1>
			<div className="setup_div">
				<p className="setup_info">
					Welcome to the Tompkins Competition Management System! Before you can get started on the competition,
					you'll need to fill in some basic info about your team. <strong>Fields with an asterisk (*) are required. </strong>
					You can refer back to this page at any time to make changes.
				</p>
				<form onSubmit={formHandler} className="setup_form">
					<p className="form_info">Start by entering your team members' names*:</p>

					<label className="short" htmlFor="member1">Member 1:</label>
					<input autoComplete="false" className={`text_field short ${err.nameError && 'error'}`} placeholder="Full Name" name="member1" id="member1" type="text" value={member1} onChange={e => setMember1(e.target.value)} />
					<br />

					<label className="short" htmlFor="member2">Member 2:</label>
					<input className="text_field short" placeholder="Full Name (If they exist)" name="member2" id="member2" type="text" value={member2} onChange={e => setMember2(e.target.value)} />
					<br />

					<label className="short" htmlFor="member3">Member 3:</label>
					<input className="text_field short" placeholder="Full Name (If they exist)" name="member3" id="member3" type="text" value={member3} onChange={e => setMember3(e.target.value)} />
					<br />

					<label className="long" htmlFor="school">Now enter the school you attend*:</label><br />
					<input className={`text_field long ${err.schoolError && 'error'}`} placeholder="Eg. OTHS" name="school" id="school" type="text" value={school} onChange={e => setSchool(e.target.value)} />
					<br />

					<button className="button submit">Submit -&gt;</button>
					<p className={`info-msg ${err && 'error'} ${sub && 'sub'}`}>{err ? err.msg : (sub && "Information Saved! ")}<strong>{sub && "You can now navigate to the tabs above!"}</strong></p>
				</form>
			</div>
		</div>
	)
}

export default Setup
