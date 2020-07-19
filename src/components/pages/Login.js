import React from 'react';
import { useAuth } from '../AuthProvider';
import { Redirect } from 'react-router-dom';
import '../../styles/login.css'
import { useState } from 'react';

const Login = () => {
	//Default error status
	const initError = {
		"classes": "none",
		"msg": ""
	}

	//Loads authentication from context
	const { login, authenticated } = useAuth()

	//State variables (username , password, error)
	const [user, setUser] = useState("")
	const [pass, setPass] = useState("")
	const [err, setErr] = useState(initError)

	//Login callback (Runs if authentication fails)
	const callback = () => {
		if (authenticated === false) {
			setErr({
				"classes": "error",
				"msg": "Authentication Error!"
			})
		}
	}

	//Handles form submissions and input validation
	const formHandler = (e) => {
		e.preventDefault();
		if (!user) {
			setErr({
				"classes": "error usererror",
				"msg": "Error: Username field is empty!"
			})
		}
		if (!pass) {
			setErr({
				"classes": "error passerror",
				"msg": "Error: Password field is empty!"
			})
		}
		if (!user && !pass) {
			setErr({
				"classes": "error usererror passerror",
				"msg": "Error: Username & Password fields are empty!"
			})
		}
		if (user && pass) {
			login(user, pass, callback)
		}
	}

	//Returns login page if user is not authenticated
	if (authenticated === false) {
		return (
			<div onClick={() => setErr(initError)}>
				<div className={`login-main ${err.classes}`}>
					<div className="login_container">
						<div className="wordmark_container">
							<h3 className="wordmark">Tompkins</h3>
							<h3 className="wordmark light">Competition Management System</h3>
						</div>
						<form className={"form_container"} onSubmit={formHandler}>
							<input className={`text_field user ${err.classes}`} onClick={() => setErr(initError)} placeholder="username" type="username" value={user} onChange={e => setUser(e.target.value)} />
							<input className={`text_field pass ${err.classes}`} onClick={() => setErr(initError)} placeholder="password" type="password" value={pass} onChange={e => setPass(e.target.value)} />
							<button className="button">Sign In -&gt;</button>
						</form>
					</div>
					<p className={`error-msg ${err.classes}`}>{err.msg}&nbsp;</p>
				</div>
			</div>
		)
	} else if (authenticated === true) { //Redirects to dashboard if user is authenticated
		return (
			<Redirect to="/app" />
		)
	}
	else { //Returns nothing whilst waiting for authentication
		return null;
	}
}

export default Login
