import React, { createContext, useContext, useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
}

export const AuthProvider = props => {
	//  userObject looks like {
	// 	"authenticated": "false",
	// 	"auth_key": 0,
	// 	"admin": 0,
	// 	"role": "JUDGE",
	// 	"team_data": null
	// }

	//TODO put all of these functions into different js files that are imported here for readability

	const [authData, setAuthData] = useState(null)

	useEffect(() => { //Attempts to auto-sign in using session cookie
		var authToken = cookie.load('auth-token')
		if (authToken) {
			axios.post(
				'confirm_login.php',
				{ authtoken: authToken, }
			)
				.then(res => {
					if (res.data.authenticated)
						setAuthData(res.data)
					else
						setAuthData({ "authenticated": false })
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			setAuthData({ "authenticated": false })
		}
	}, [])

	const login = (user, pass, callback) => { //Manual login using username & pass
		axios.post(
			'login.php',
			{
				username: user,
				password: pass
			}
		)
			.then(res => {
				if (res.data.authenticated) {
					cookie.save('auth-token', res.data.auth_key, { 'path': '/' });
					setAuthData(res.data)
				}
			})
			.catch(err => {
				console.log(err)
				setAuthData({ "authenticated": false })
			})
			.finally(() => {
				callback()
			})
	}

	const logout = () => { //Logs out by removing session cookie
		cookie.remove('auth-token', { 'path': '/' })
		setAuthData({ "authenticated": false })
	}

	const setTeamData = (member1, member2, member3, school, callback) => { //Sets user's team data
		//Checks if team already exists for user and updates existing team, otherwise creates new
		var authToken = cookie.load('auth-token')
		axios.post(
			'team_manager.php',
			{
				"authtoken": authToken,
				"action": authData.team_data === false ? "CREATE" : "UPDATE",
				"member1": member1,
				"member2": member2,
				"member3": member3,
				"school": school
			}
		)
			.then(res => {
				console.log(res);
				if (res.data.success) {
					//TODO make the backend return a user_data object w/ stuff to repopulate fields
					// console.log("A");
					// var newData = {...authData}
					// console.log(newData)
					// console.log("B");
					setAuthData({...authData, "team_data": {"member1":"A","member2":"B","member3":"C","school":"oths"}})
					console.log(authData)
				}
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
			})
	}

	const authDataVal = { ...authData, login, logout, setTeamData }  //Provides above content to consumers

	return <AuthContext.Provider value={authDataVal} {...props} />
}

export default AuthProvider