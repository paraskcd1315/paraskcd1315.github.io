import React, { Fragment, useLayoutEffect, useState } from 'react';
import './sass/App.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Decorations from './components/Decorations';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import AboutMe from './components/pages/AboutMe';
import Skills from './components/pages/Skills';
import Contact from './components/pages/Contact';
import ProfileGithub from './components/pages/ProfileGithub';

const App = () => {
	const [width, setWidth] = useState(0);

	useLayoutEffect(() => {
		const updateSize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.addEventListener('resize', updateSize);
	}, []);

	return (
		<Router>
			<Fragment>
				<Decorations />
				<section className='container bg-light-opacity opacity-3 blur'>
					<Navbar windowWidth={width} />
					<Switch>
						<Route exact path='/' render={() => <Home windowWidth={width} />} />
						<Route exact path='/aboutme' component={AboutMe} />
						<Route exact path='/skills' component={Skills} />
						<Route exact path='/contact' component={Contact} />
						<Route exact path='/github' component={ProfileGithub} />
					</Switch>
				</section>
			</Fragment>
		</Router>
	);
};

export default App;
