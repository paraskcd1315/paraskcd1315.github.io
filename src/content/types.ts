export interface Profile {
	name: readonly string[];
	tagline: string;
	rolesShort: readonly string[];
	location: { city: string; origin: string; eyebrow: string };
	email: string;
	signature: string;
	copyright: string;
}

export interface Branding {
	logoPath: string;
	logoTransparentPath: string;
	avatarPath: string;
	avatarAlt: string;
	badgeAriaLabel: string;
	badgeHref: string;
	konamiFlashText: string;
}

export interface Social {
	label: string;
	href: string;
}

export interface HeroMetaItem {
	label: string;
	value: string;
	accent?: boolean;
}

export interface HeroContent {
	greeting: readonly string[];
	taglineLabel: string;
	meta: readonly HeroMetaItem[];
	stacksLabel: string;
}

export interface AboutStory {
	n: string;
	h: string;
	p: string;
}

export interface AboutContent {
	heading: string;
	headingTagline: string;
	labels: { currently: string; from: string };
	stories: readonly AboutStory[];
}

export interface Skill {
	icon: string;
	name: string;
	cat: string;
}

export interface SkillsContent {
	heading: string;
	body: string;
	items: readonly Skill[];
}

export interface Project {
	num: string;
	title: string;
	stack: string;
	kind: string;
	link: string;
}

export interface ProjectsContent {
	heading: string;
	countSuffix: string;
	hint: string;
	items: readonly Project[];
}

export interface Photo {
	src: string;
	cap: string;
	link: string;
}

export interface PhotosContent {
	heading: string;
	body: string;
	items: readonly Photo[];
}

export interface Video {
	id: string;
	title: string;
	tag: string;
}

export interface VideosContent {
	heading: string;
	body: string;
	featured: Video;
	others: readonly Video[];
}

export interface Tagline {
	verb: string;
	rest: string;
}

export interface ContactContent {
	taglines: readonly Tagline[];
}

export interface IntroContent {
	logoAlt: string;
}

export interface TimelineLink {
	label: string;
	href: string;
}

export interface TimelineEvent {
	date: string;
	title: string;
	body: string;
	tags?: readonly string[];
	links?: readonly TimelineLink[];
}

export interface TimelineContent {
	heading: string;
	body: string;
	items: readonly TimelineEvent[];
}

export interface PortfolioContent {
	profile: Profile;
	branding: Branding;
	socials: readonly Social[];
	hero: HeroContent;
	about: AboutContent;
	skills: SkillsContent;
	projects: ProjectsContent;
	photos: PhotosContent;
	videos: VideosContent;
	contact: ContactContent;
	intro: IntroContent;
}
