import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import useWindowDimensions from '../hooks/useWindowDimensions';
import './App.css';

function App() {
  const month = new Date().getMonth()
  const { height, width } = useWindowDimensions();
  const [ imageLoaded, isImageLoaded ] = useState(false);
  const [ githubRepos, setGithubRepos ] = useState([]);

  const containerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const githubRef = useRef(null);

  const handleClick = (ref) => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get('https://api.github.com/users/paraskcd1315/repos', {
				params: {
					per_page: '10',
					sort: 'updated:asc'
				}
			});
			setGithubRepos(response.data);
		};

		fetchData()
	}, []);

  let season = "winter";

  if (month > 3 && month <= 5) {
    season = "spring";
  } else if (month > 5 && month <= 7) {
    season = "summer";
  } else if (month > 7 && month <= 9) {
    season = "autumn"
  } else {
    season = "winter"
  }

  return (
    <div className="App" style={{ width: width, height: height, backgroundColor: "#000", overflow: "hidden" }}>
      <img src={`https://source.unsplash.com/${width}x${height}/?${season}`} alt="" onLoad={() => isImageLoaded(true)}/>
      {
        imageLoaded
        ?
        (
          <>
          <button className='btn wallCredits' onClick={() => window.open("https://unsplash.com", "_blank").focus()}>
            Images from Unsplash
          </button>
          <div className="header">
            <button className="btn" onClick={() => containerRef.current?.scrollTo({top: 0, behavior: 'smooth'})}>
              <i className="fa-solid fa-home"></i>
              <span>{" "} Home</span>
            </button>
            <button className="btn" onClick={() => handleClick(aboutRef)}>
              <i className="fa-solid fa-info-circle"></i>
              <span>{" "} About me</span>
            </button>
            <button className="btn" onClick={() => handleClick(skillsRef)}>
              <i className="fa-solid fa-graduation-cap"></i>
              <span>{" "} Skills</span>
            </button>
            <button className="btn" onClick={() => handleClick(githubRef)}>
              <i className="fa-brands fa-github"></i>
              <span>{" "} Github Projects</span>
            </button>
          </div>
          <div className='mainContainer'>
            <div className='contentContainer' ref={containerRef}>
              <div className='content' ref={homeRef}>
                <span style={{ fontSize: "1.3rem" }}>Hi! I'm</span>
                <h1>Paras Khanchandani</h1>
                <span style={{ fontSize: "0.9rem" }}>iOS Developer | macOS Developer | web Developer | UX/UI Designer</span>
                <div className='homeButtons'>
                  <button className='btn cv' onClick={() => window.open("https://paraskcd.com/CV.pdf", "_blank").focus()}>
                    <i className="fa-solid fa-file"></i>
                    <span>{" "} Resume</span>
                  </button>
                  <button className='btn github' onClick={() => window.open("https://github.com/paraskcd1315", "_blank").focus()}>
                    <i className="fa-brands fa-github"></i>
                    <span>{" "} GitHub</span>
                  </button>
                  <button className='btn twitter' onClick={() => window.open("https://twitter.com/paraskcd", "_blank").focus()}>
                    <i className="fa-brands fa-twitter"></i>
                    <span>{" "} Twitter</span>
                  </button>
                  <button className='btn linkedin' onClick={() => window.open("https://in.linkedin.com/in/parakcd", "_blank").focus()}>
                    <i className="fa-brands fa-linkedin"></i>
                    <span>{" "} LinkedIn</span>
                  </button>
                  <button className='btn artstation' onClick={() => window.open("https://www.artstation.com/paraskcd", "_blank").focus()}>
                    <i className="fa-brands fa-artstation"></i>
                    <span>{" "} Artstation</span>
                  </button>
                </div>
              </div>
              <div className="verticalLine"></div>
              <div className='dualContent'>
                <img src="./IMG_7355.jpeg" alt="PFP" />
                <div className="content" ref={aboutRef}>
                  <h1>About me</h1>
                  <p>I'm Paras Khanchandani and I'm from Tenerife, Canary Islands, Spain. Currently, I'm a student located in Mississauga, Canada. I have a keen interest to learn and develop different types of Applications for the Web as well as different Operating Systems. Developing is my Passion, and I want to focus my career to be a Full Stack Developer.</p>
                  <p>I have a small experience working for a Company named "Vidhema Technologies" in Jaipur, India. I was responsible, for being a Full Stack Web Developer for different Clients, talking with them to understand their desires and making sure the end product is upto mark.</p>
                  <p>From doing personal projects, to freelancing, I've done a lot of development for macOS, iOS and Web, all through which can be seen in my <a href='https://github.com/paraskcd1315'>Github</a></p>
                  <p>Other than developing software/websites I also have experience for designing UI, making Photo Manipulations with Adobe Photoshop, making different 3D Models and Texturing them with Autodesk Maya and Substance Painter respectively and also worked in creating Motion Graphics with Tools like Adobe Premiere and Adobe After Effects.</p>
                </div>
              </div>
              <div className="verticalLine"></div>
              <div className="content shorter" ref={skillsRef}>
                <h1>Skills</h1>
                <ul>
                  <li><h3>macOS and iOS Development</h3></li>
                  <ul>
                    <li>Swift</li>
                    <li>SwiftUI</li>
                    <li>React Native</li>
                    <li>Electron</li>
                  </ul>
                  <li><h3>Web Development</h3></li>
                  <ul>
                    <li>ReactJS</li>
                    <li>Redux Toolkit</li>
                    <li>Angular</li>
                    <li>JavaScript</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>SCSS</li>
                    <li>SASS</li>
                    <li>JavaScript</li>
                    <li>JQuery</li>
                  </ul>
                  <li><h3>API Development</h3></li>
                  <ul>
                    <li>MondoDB</li>
                    <li>ExpressJS</li>
                    <li>NodeJS</li>
                    <li>TypeORM</li>
                    <li>Mongoose</li>
                  </ul>
                  <li><h3>Softwares</h3></li>
                  <ul>
                    <li>Nodepad ++</li>
                    <li>Visual Studio Code</li>
                    <li>Git</li>
                    <li>Xcode</li>
                    <li>Adobe Photoshop</li>
                    <li>Adobe After Effects</li>
                    <li>Adobe Premiere</li>
                    <li>Autodesk Maya</li>
                    <li>Autodesk 3ds Max</li>
                    <li>Substance Painter</li>
                    <li>Marmoset</li>
                    <li>Unreal Engine</li>
                    <li>Blender</li>
                  </ul>
                </ul>
              </div>
              <div className="verticalLine"></div>
              <div className="content" ref={githubRef}>
                <h1 style={{textAlign: "center"}}>GitHub Projects</h1>
                {githubRepos.map((repo) => {
                  return (
                    <div className="repoItem">
                      <div className="repoInfo" onClick={() => window.open(repo.html_url, "_blank").focus()}>
                        <div className="repoName"><h3>{repo.name}</h3></div>
                        <div className="repoDescription">{repo.description}</div>
                      </div>
                      <div className="repoStats">
                        <div className="statsItem">
                          <i className='fa fa-code-fork'></i>
                          {repo.forks}
                        </div>
                        <div className="statsItem">
                          <i className='fa fa fa-eye'></i>
                          {repo.watchers_count}
                        </div>
                        <div className="statsItem">
                          <i className='fa fa-star'></i>
                          {repo.stargazers_count}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          </>
        )
        :
        (
          <>
            <div className='loading'>
              <FadeLoader color="#ffffff" />
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;
