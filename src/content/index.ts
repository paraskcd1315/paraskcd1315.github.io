import profile from "./profile.json";
import branding from "./branding.json";
import socials from "./socials.json";
import hero from "./hero.json";
import about from "./about.json";
import skills from "./skills.json";
import projects from "./projects.json";
import photos from "./photos.json";
import videos from "./videos.json";
import contact from "./contact.json";
import intro from "./intro.json";
import type {
  AboutContent,
  Branding,
  ContactContent,
  HeroContent,
  IntroContent,
  PhotosContent,
  PortfolioContent,
  Profile,
  ProjectsContent,
  SkillsContent,
  Social,
  VideosContent,
} from "./types";

const PORTFOLIO_CONTENT: PortfolioContent = {
  profile: profile as Profile,
  branding: branding as Branding,
  socials: socials as readonly Social[],
  hero: hero as HeroContent,
  about: about as AboutContent,
  skills: skills as SkillsContent,
  projects: projects as ProjectsContent,
  photos: photos as PhotosContent,
  videos: videos as VideosContent,
  contact: contact as ContactContent,
  intro: intro as IntroContent,
};

export default PORTFOLIO_CONTENT;
export * from "./types";
