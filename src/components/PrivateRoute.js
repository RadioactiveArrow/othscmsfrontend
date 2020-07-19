import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const PrivateRoute = ({ component, ...options }) => {
	const {authenticated} = useAuth()
	// const finalComponent = authenticated == true ? component : Login;
	if (authenticated === true) {
		return <Route {...options} component={component} />;
	} else if (authenticated === false) {
		return <Redirect to="/login"/>
	} else {
		return null
	}
}

export default PrivateRoute
