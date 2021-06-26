import React, { Fragment } from 'react';
import './sass/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Decorations from './components/Decorations';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import AboutMe from './components/pages/AboutMe';
import Skills from './components/pages/Skills';
import Contact from './components/pages/Contact';
import ProfileGithub from './components/pages/ProfileGithub';

const App = () => {
	return (
		<Router>
			<Fragment>
				<Decorations />
				<section className='container bg-light-opacity opacity-3 blur'>
					<Navbar />
					<Switch>
						<Route exact path='/' component={Home} />
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
