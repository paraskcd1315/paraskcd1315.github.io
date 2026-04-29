const PORTFOLIO_DATA = {
	name: ['Paras', 'Khanchandani'],
	tagline: 'Full-stack engineer & UX/UI designer',
	rolesShort: ['Web', 'iOS', 'macOS', 'Android', 'UX/UI'],
	location: {
		city: 'Castelldefels, Barcelona',
		origin: 'Tenerife, Canary Islands'
	},
	email: 'dev@paraskcd.com',
	about: [
		{
			n: '01',
			h: 'Full Stack Developer.',
			p: "I'm a <strong>Software Engineer at <span class='hl'>Unimedia Technology</span></strong>, where I make full scalable Web as well as Mobile Applications with technologies like <strong>C# .NET</strong>, <strong>Blazor WASM</strong>, <strong>ReactJS</strong>, <strong>NextJS</strong>, <strong>Swift</strong>, <strong>Kotlin</strong> and <strong>Jetpack Compose</strong>. Every project gets me to learn something new, a new tool, framework or architecture problem to solve."
		},
		{
			n: '02',
			h: 'DevOps and self-hosting.',
			p: "I'm adaptable at implementing <strong>Docker</strong> based containers and providing DevOps solutions on platforms like <strong>Microsoft Azure</strong>, <strong>AWS</strong> and CI/CD pipelines. I also self host a few of my own platforms on a home server, as I like to understand the full stack from the bottom up."
		},
		{
			n: '03',
			h: 'Design first.',
			p: "I sketch in <strong>Figma</strong> before I touch the editor. I'm able to deliver user-centric solutions focusing on performance, security and maintainability."
		},
		{
			n: '04',
			h: 'Team player, Agile by default.',
			p: "I'm a good team player with experience in <strong>Agile</strong> Environments, using tools like <strong>Jira</strong> and <strong>Git</strong> to ensure proper coordination of multiple projects among team members. Programming is my passion, it lets me keep learning and solve problems at ease."
		},
		{
			n: '05',
			h: 'Outside of work.',
			p: "I love <strong>space</strong>, I love <strong>science</strong>. I watch a lot of YouTube videos on astrophysics, cosmology, <span class='hl'>black holes</span>, quantum physics and new research. I also kind of think we live in a <strong>simulation</strong>, and the more I read about it, the more interesting it gets."
		},
		{
			n: '06',
			h: 'Favourite movies and series.',
			p: "My favourite movies are <strong>The Matrix trilogy</strong>, <strong>Inception</strong> and <strong>Interstellar</strong>. My favourite series is <span class='hl'>Mr. Robot</span>."
		}
	],
	skills: [
		{ icon: '/dotnetcore.png', name: '.NET Core', cat: 'Backend' },
		{ icon: '/dotnetcore.png', name: 'C#', cat: 'Language' },
		{ icon: '/azure.png', name: 'Azure DevOps', cat: 'Cloud' },
		{ icon: '/aws.png', name: 'AWS', cat: 'Cloud' },
		{ icon: '/swift.png', name: 'Swift', cat: 'Apple' },
		{ icon: '/kotlin.png', name: 'Kotlin', cat: 'Android' },
		{ icon: '/swiftui.png', name: 'SwiftUI', cat: 'Apple' },
		{ icon: '/jetpackcompose.webp', name: 'Jetpack Compose', cat: 'Android' },
		{ icon: '/javascript.webp', name: 'JavaScript', cat: 'Web' },
		{ icon: '/angular.png', name: 'AngularJS', cat: 'Web' },
		{ icon: '/react.webp', name: 'React / Next', cat: 'Web' },
		{ icon: '/redux.png', name: 'Redux', cat: 'State' },
		{ icon: '/electron.png', name: 'ElectronJS', cat: 'Desktop' },
		{ icon: '/express.png', name: 'ExpressJS', cat: 'Backend' },
		{ icon: '/mongodb.png', name: 'MongoDB', cat: 'Data' },
		{ icon: '/dotnetcore.png', name: 'Blazor WASM', cat: 'Web' },
		{ icon: '/photoshop.png', name: 'Photoshop', cat: 'Design' },
		{ icon: '/aftereffects.png', name: 'After Effects', cat: 'Motion' },
		{ icon: '/figma.png', name: 'Figma', cat: 'Design' },
		{ icon: '/finalcutpro.png', name: 'Final Cut Pro', cat: 'Video' }
	],
	projects: [
		{
			num: '01',
			title: 'KCD Search for Android',
			stack: 'Kotlin · Jetpack Compose · Hilt · Retrofit · Coroutines',
			kind: 'kcd',
			link: 'https://github.com/paraskcd1315/KCDSearch-Android'
		},
		{
			num: '02',
			title: 'Influential Launcher for Android',
			stack: 'Kotlin · Jetpack Compose · Custom launcher',
			kind: 'influential',
			link: 'https://github.com/paraskcd1315/InfluentialLauncher'
		},
		{
			num: '03',
			title: 'Spotlight Search for Android',
			stack: 'Kotlin · Jetpack Compose · Hilt · OkHttp · Google Suggestion API',
			kind: 'spotlight',
			link: 'https://play.google.com/store/apps/details?id=com.paraskcd.spotlightsearch'
		},
		{
			num: '04',
			title: 'United Walls',
			stack: 'ExpressJS · Mongoose · Grammy · iOS · Android · Raspberry Pi',
			kind: 'unitedwalls',
			link: 'https://github.com/United-Walls'
		}
	],
	photos: [
		{
			src: '/assets/render-1.jpg',
			cap: 'Cyber Punk Alley Project',
			link: 'https://www.artstation.com/artwork/N5J9Eb'
		},
		{
			src: '/assets/render-2.jpg',
			cap: "A Psychopath's Dream Project",
			link: 'https://www.artstation.com/artwork/RYJ08O'
		},
		{
			src: '/assets/render-3.jpg',
			cap: 'AKM Rifle Project',
			link: 'https://www.artstation.com/artwork/mq1exy'
		},
		{
			src: '/assets/render-4.jpg',
			cap: 'Vintage Generator Machinery Project',
			link: 'https://www.artstation.com/artwork/nQ8L5o'
		},
		{
			src: '/assets/render-5.jpg',
			cap: 'Wooden Lever Project',
			link: 'https://www.artstation.com/artwork/w8yBL6'
		},
		{
			src: '/assets/render-6.jpg',
			cap: 'Mechanical Carriage Project',
			link: 'https://www.artstation.com/artwork/e059a3'
		},
		{
			src: '/assets/render-7.jpg',
			cap: 'Gaming Prop Project',
			link: 'https://www.artstation.com/artwork/EVXJLA'
		}
	],
	videos: {
		featured: {
			id: 'zcWLPPgVnTM',
			title: 'Showreel',
			tag: 'Reel'
		},
		others: [
			{
				id: 'RYQVfypDQKY',
				title: 'XenHTML setup for jailbroken iPhones',
				tag: 'iOS · UI'
			},
			{
				id: 'GpaYbYNGciI',
				title: 'Windows Phone UI on iPhone, with XenHTML',
				tag: 'iOS · UI'
			}
		]
	},
	socials: [
		{ label: 'GitHub', href: 'https://github.com/paraskcd1315' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/parakcd/' },
		{ label: 'Artstation', href: 'https://www.artstation.com/paraskcd' },
		{ label: 'Mail', href: 'mailto:dev@paraskcd.com' }
	]
};

export default PORTFOLIO_DATA;
