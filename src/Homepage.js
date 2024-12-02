import { useState, useEffect, useRef } from 'react';
import styles from './Homepage.module.css';
import sound from './you_read_my_mind.mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faGoodreads } from '@fortawesome/free-brands-svg-icons';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';


const Homepage = () => {
  const [showVolume, setShowVolume] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1080);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX);
    document.body.style.setProperty('--mouse-y', e.clientY);
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1080);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const audioRef = useRef(null)
  const aboutSection = useRef(null)
  const experienceSection = useRef(null)


  const handleVolumeIcon = () => {
    setShowVolume(prevState => !prevState)
  }

  const playPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  useEffect(() => {
    if (audioRef.current) {
      const playAudio = async () => {
        try {
          if (isPlaying) {
            await audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
        } catch (error) {
          console.error("Audio playback failed:", error);
        }
      };

      playAudio();
    }
  }, [isPlaying]);

  const handleIconAndPlay = () => {
    handleVolumeIcon()
    playPause()
  }

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const Navigation = ({ section, title }) => {
    return (
      <li>
        <div className={styles.listContainer} onClick={() => scrollToSection(section)}>
          <h4 className={styles.tabText}>{title}</h4>
          <div className={styles.line}></div>
        </div>
      </li>
    )
  }

  const expList = ["https://www.getmesmo.com/", "https://bazar-prime.com/", "https://teff.tech/", "https://specranks.com/laptops"]
  const Experience = ({ year, role, description, skills, index }) => {
    const isDimmed = hoveredIndex !== null && hoveredIndex !== expList[index];
    return (
      <a href={expList[index]} 
      className={`${styles.experienceWrapper} ${isDimmed ? styles.dimmed : ""}`}
      onMouseEnter={() => handleMouseEnter(expList[index])}
      onMouseLeave={handleMouseLeave}
      >
        <p>{year}</p>
        <div>
          <h1 className={styles.role}>{role}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.skillsContainer}>
            {skills.map(skill => <div key={skill} className={styles.skill}>{skill}</div>)}
          </div>
        </div>
      </a>
    )
  }

  return (
    <div className={styles.mainContainer}>
      <audio
        ref={audioRef}
        controls={false}
        src={sound}
      />
      <div className={styles.outerLeftContainer}>
      </div>
      <div className={styles.centerGridContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.title}>
            <h1>Hanna Qadi</h1>
            <h2>Frontend Engineer</h2>
            <h3>I build accessible, pixel perfect digital experiences for the web and mobile devices.</h3>
          </div>
          {!isMobile ?
            <ul className={styles.listStyle}>
              <Navigation
                section={aboutSection}
                title="About"
              />
              <Navigation
                section={experienceSection}
                title="Experience"
              />
              <Navigation
                section={aboutSection}
                title="Projects"
              />
              <Navigation
                section={aboutSection}
                title="Contact"
              />
            </ul>
            : <></>}
          <div className={styles.socials}>
            <a href="https://github.com/hxnoons">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/hannaabdulalim/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://codepen.io/hxnoons">
              <FontAwesomeIcon icon={faCodepen} />
            </a>
            <a href="https://www.goodreads.com/user/show/156277793-hanna">
              <FontAwesomeIcon icon={faGoodreads} />
            </a>
            <a href="mailto:hannaabdulalim@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
          <div className={styles.bottomRightIcons}>
            {!isMobile ?
              <> {showVolume ? <FontAwesomeIcon icon={faVolumeHigh} onClick={handleIconAndPlay} /> : <FontAwesomeIcon icon={faVolumeXmark} onClick={handleIconAndPlay} />} </>
              : <></>}
            {/* <span className={styles.rotateText}>Now Playing: You Read my Mind by David Benoit</span> */}
            <marquee direction="left" scrollamount="3" scrolldelay="40" className={styles.marquee}>Now Playing: You read my mind by David Benoit</marquee>

          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerGrid} ref={aboutSection}>
            {isMobile ? <h3 className={styles.headersMobile} >About</h3> : <></>}
            <p> I’m a frontend engineer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My work thrives at the intersection of creativity and technology, where I transform complex ideas into seamless, high-performing digital experiences.
              <br /><br />
              Over the years, I've developed software across a variety of industries — from building the entire front-end architecture at Mesmo to leading cross-platform solutions for startups like Jumeeya and Teff. Whether optimizing applications for scale or designing features that elevate usability, I bring a detail-oriented approach that prioritizes both performance and inclusivity.
              <br /><br />
              When I’m not coding, I enjoy exploring creative outlets like digital art and music production, finding inspiration in the overlap between artistry and technology. I’m also passionate about staying ahead of industry trends, constantly learning, and pushing the boundaries of what’s possible in web and mobile development.
            </p>
            {isMobile ? <h3 className={styles.headersMobile}>Experience</h3> : <></>}
            <div className={styles.experienceContainer} ref={experienceSection}>
              <Experience
                year="2024-2024"
                role="Mesmo - Frontend Developer"
                description="Developed the entire front-end architecture from scratch using React Native, ensuring a seamless and efficient user experience.
                Maintained comprehensive documentation of the front-end codebase, facilitating easier future development and onboarding.
                Leveraged cutting-edge tools and technologies to stay ahead of industry trends and deliver a modern, high-performing application."
                skills={["React Native", "TypeScript", "CSS"]}
                index={0}
              />
              <Experience
                year="2022-2023"
                role="Bazar - Frontend Developer"
                description="Lead development of inventory management tools used by all current merchants on mobile platforms.
                Worked with founders to outline technical scope of future features.
                Key contributor to technical team discussions that avoided major technical debt.
                Worked with other team engineers to convert Swift application to React Native."
                skills={["React Native", "TypeScript", "CSS"]}
                index={1}
              />
              <Experience
                year="2022-2022"
                role="Jumeeya-Frontend Developer"
                description=" Lead the Android efforts for a closed beta starting before the end of the year.
                  Configured mobile OS specific elements and packages to function properly between IOS and Android platforms.
                  Unified user interface across mobile OS and reconfigured CSS to be more responsive across device sizes and platforms."
                skills={["React Native", "TypeScript", "CSS"]}
              />
              <Experience
                year="2022-2022"
                role="Jumeeya-Frontend Developer"
                description=" Lead the Android efforts for a closed beta starting before the end of the year.
                  Configured mobile OS specific elements and packages to function properly between IOS and Android platforms.
                  Unified user interface across mobile OS and reconfigured CSS to be more responsive across device sizes and platforms."
                skills={["React Native", "TypeScript", "CSS"]}
              />
              <Experience
                year="2022-2022"
                role="Jumeeya-Frontend Developer"
                description=" Lead the Android efforts for a closed beta starting before the end of the year.
                  Configured mobile OS specific elements and packages to function properly between IOS and Android platforms.
                  Unified user interface across mobile OS and reconfigured CSS to be more responsive across device sizes and platforms."
                skills={["React Native", "TypeScript", "CSS"]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.outerRightContainer}></div>
    </div>
  )
}
export default Homepage;
