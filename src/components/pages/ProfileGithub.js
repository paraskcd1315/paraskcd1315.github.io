import React, { Fragment, useState, useEffect } from 'react';
import github from '../../apis/github';
import { CLIENT_ID, CLIENT_SECRET } from '../../apis/config';

const ProfileGithub = () => {
	const [githubRepos, setRepos] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await github.get('/repos', {
				params: {
					per_page: '10',
					sort: 'created:asc',
					client_id: CLIENT_ID,
					client_secret: CLIENT_SECRET
				}
			});
			setRepos(response.data);
			setLoading(false);
		};

		setTimeout(() => {
			setLoading(true);
			setShow(true);
			setTimeout(() => fetchData(), 250);
		}, 250);
	}, []);

	return (
		<Fragment>
			<div className={show ? `profile animate show` : `profile animate hide`}>
				<div className='github-repos'>
					<h1 className='x-large'>Github Repos</h1>
					{isLoading ? (
						<div class='lds-ring'>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					) : (
						<div className='repo-list'>
							{githubRepos.map((repo, index) => {
								const classchange = isLoading ? '' : `animate-${index + 1}`;
								return (
									<div
										key={repo.id}
										className={`repo-item ${classchange} bg-light-opacity opacity-4`}>
										<a href={repo.html_url}>
											<div className='repo-info'>
												<div className='repo-name lead'>{repo.name}</div>
												<div className='repo-description'>
													{repo.description}
												</div>
											</div>
											<div className='repo-stats'>
												<div className='stats-item repo-forks'>
													<i class='fa fa-code-fork' aria-hidden='true'></i>
													{repo.forks}
												</div>
												<div className='stats-item repo-watchers'>
													<i class='fa fa-eye' aria-hidden='true'></i>
													{repo.watchers_count}
												</div>
												<div className='stats-item repo-stargazers'>
													<i class='fa fa-star' aria-hidden='true'></i>
													{repo.stargazers_count}
												</div>
											</div>
										</a>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileGithub;
