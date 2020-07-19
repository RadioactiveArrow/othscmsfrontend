import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import SubNav from '../SubNav';
import { useAuth } from '../AuthProvider';
import { useEffect } from 'react';
import CodeEditor from '../CodeEditor'

import Home from './Home'
import Setup from './competitor/Setup';
import Problems from './competitor/Problems';
import '../../styles/resizer.css'

const Dashboard = props => {
	const { path } = props.match
	const { pathname } = props.location
	const current = pathname.split('/').pop()

	const splitStyles = {
		"position": "static",
	};

	return (
		<div className="SplitPaneCtr">
			<SplitPane split="vertical" defaultSize={'50%'} style={splitStyles}>
				<DashRouter path={path} current={current} />
				{/* <div> */}
					<CodeEditor/>
				{/* </div> */}
			</SplitPane>
		</div>
	)
}

const DashRouter = props => {
	const path = props.path
	const current = props.current

	const initData = [
		{
			"label": "Setup",
			"link": "/setup",
			"component": Setup
		},
		{
			"label": "Problems",
			"link": "/submit",
			"component": Problems
		},
		{
			"label": "Runs",
			"link": "/runs",
			"component": Page1
		},
		{
			"label": "Clarify",
			"link": "/clarifications",
			"component": Page2
		},
		{
			"label": "Ranking",
			"link": "/leaderboard",
			"component": Page3
		}
	]

	const { authenticated, team_data } = useAuth()
	const [routes, setRoutes] = useState([])

	useEffect(() => {
		if (team_data === false) {
			setRoutes([{
				"label": "Setup",
				"link": "/setup",
				"component": Setup
			}])
		} else if (team_data) {
			setRoutes(initData)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [team_data])

	return (
		<div>
			<SubNav path={path} routes={routes} current={current} />
			{routes.map(route => (
				<Route key={route.link} path={`${path}${route.link}`} exact component={route.component} />
			))}
			<Route exact path="/app" render={() => !(team_data === false) ? <Redirect to={`${path}/submit`} /> : <Redirect to={`${path}/setup`} />} />
		</div>
	)
}

const Page1 = () => {
	const { authenticated, team_data } = useAuth();
	return (
		<div className="content">
			<h2 className="subtitle">Questions Submitted: 0</h2>
			<h1 className="title">Runs</h1>
			<div className="problems_div">
			</div>
		</div>
	)
}

const Page2 = () => {
	const { authenticated, team_data } = useAuth();
	return (
		<div className="content">
			<h2 className="subtitle">Pending Clarifications: 0</h2>
			<h1 className="title">Clarifications</h1>
			<div className="problems_div">
			</div>
		</div>
	)
}

const Page3 = () => {
	const { authenticated, team_data } = useAuth();
	return (
		<div className="content">
			<h2 className="subtitle">Your Rank: --/50</h2>
			<h1 className="title">Rankings</h1>
			<div className="problems_div">
				<p className="setup_info">
					Your performance <strong>reflects your value as a person!</strong>
				</p>
			</div>
		</div>
	)
}

export default Dashboard
