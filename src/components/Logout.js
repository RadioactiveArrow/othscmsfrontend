import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Logout = () => {
	const { logout } = useAuth();

	useEffect(() => {
		logout()
	}, [logout])
	
	return (
		<Redirect to="/login" />
	)
}

export default Logout