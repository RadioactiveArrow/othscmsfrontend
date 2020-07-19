import React from 'react';
import '../styles/nav.css'
import { Link } from 'react-router-dom';

const Nav = ({ path, routes, current }) => {
	return (
		<nav className="sub-nav">
			<ul className="sub-nav-links">
				{
					routes.map(route => (
						<li key={route.link} className="sub-nav-item"><Link className={`sub-router-link ${route.link.split('/')[1] === current ? "current" : ""}`} to={`${path}${route.link}`}>{route.label}</Link></li>
					))
				}
			</ul>
		</nav>
	)
}

export default Nav;