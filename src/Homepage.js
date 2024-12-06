import { useState, useEffect, useRef } from 'react';
import styles from './Homepage.module.css';
import sound from './assets/you_read_my_mind.mp3'
import codepenImg from './assets/codepen_thumbnail.png'
import openprocessingImg from './assets/openprocessing_thumbnail.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faGoodreads } from '@fortawesome/free-brands-svg-icons';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Homepage = () => {
  const [showVolume, setShowVolume] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1080);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const audioRef = useRef(null)
  const aboutSection = useRef(null)
  const experienceSection = useRef(null)
  const projectSection = useRef(null)
  const rightContainerRef = useRef(null);

  /*For Mouse Glow */
  document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX);
    document.body.style.setProperty('--mouse-y', e.clientY);
  });

  /*Audio*/
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

  /*Checks if Mobile*/
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1080);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*Global Scrolling */
  useEffect(() => {
    const handleGlobalScroll = (event) => {
      if (rightContainerRef.current) {
        rightContainerRef.current.scrollTop += event.deltaY;
        event.preventDefault();
      }
    };
    document.addEventListener('wheel', handleGlobalScroll, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleGlobalScroll);
    };
  }, []);

  const handleIconAndPlay = () => {
    setIsPlaying(prevState => !prevState)
    setShowVolume(prevState => !prevState)
  }

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = (section) => {
    setActiveSection(section); // Set the active section when clicked
    scrollToSection(section); // Assuming scrollToSection is defined elsewhere
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
        <div className={`${styles.listContainer} ${activeSection === section ? styles.active : ''}`}
          onClick={() => handleClick(section)}
        >
          <h4 className={`${styles.tabText} ${activeSection === section ? styles.activeText : ''}`}>{title}</h4>
          <div className={`${styles.line} ${activeSection === section ? styles.activeLine : ''}`}></div>
        </div>
      </li>
    )
  }

  const expList = ["https://www.getmesmo.com/", "https://bazar-prime.com/", "", "https://teff.tech/", "https://specranks.com/laptops"]
  const Experience = ({ index, year, role, description, skills }) => {
    const isDimmed = hoveredIndex !== null && hoveredIndex !== expList[index];
    return (
      <a href={expList[index]}
        className={`${styles.wrapper} ${isDimmed ? styles.dimmed : styles.experienceWrapper}`}
        onMouseEnter={() => handleMouseEnter(expList[index])}
        onMouseLeave={handleMouseLeave}
      >
        <p>{year}</p>
        <div>
          <h1 className={styles.role} style={isMobile ? { color: "#FFD388" } : null}>
            {role}
            <FontAwesomeIcon className={styles.iconArrow} icon={faArrowRight} transform={{ rotate: 315 }} />
          </h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.skillsContainer}>
            {skills.map(skill => <div key={skill} className={styles.skill}>{skill}</div>)}
          </div>
        </div>

      </a>
    )
  }

  const projectList = ["https://openprocessing.org/user/489802/?o=1&view=sketches", "https://codepen.io/hxnoons"]
  const Project = ({ index, image, altImg, text }) => {
    const isDimmed = hoveredIndex !== null && hoveredIndex !== projectList[index];
    return (
      <a href={projectList[index]}
        className={`${styles.wrapper} ${isDimmed ? styles.dimmed : ""}`}
        onMouseEnter={() => handleMouseEnter(projectList[index])}
        onMouseLeave={handleMouseLeave}
      >
        <img src={image} alt={altImg} className={styles.imageStyle} />
        <p>{text}</p>
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
                section={projectSection}
                title="Projects"
              />
            </ul>
            : <></>}
          <div className={styles.socials}>
            <a href="https://github.com/hxnoons">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/hannaqadi/">
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
          <div className={styles.bottomLeftIcons}>
            {!isMobile ?
              <> {showVolume ? <FontAwesomeIcon icon={faVolumeHigh} onClick={handleIconAndPlay} /> : <FontAwesomeIcon icon={faVolumeXmark} onClick={handleIconAndPlay} />} </>
              : <></>}
            {!isMobile ?
              <marquee
                direction="left"
                scrollamount="3"
                scrolldelay="40"
                title="yes the marquee is depracated and is an accesibility issue, but i think it looks cool :')"
                className={styles.marquee}
                onMouseOver={(e) => e.target.stop()}
                onMouseOut={(e) => e.target.start()}
              >
                Now Playing: You read my mind by David Benoit
              </marquee>
              : <></>}
          </div>
        </div>
        <div className={styles.rightContainer} ref={rightContainerRef}>
          <div className={styles.rightContainerGrid} ref={aboutSection}>
            {isMobile ? <h3 className={styles.headersMobile} >About</h3> : <></>}
            <p> I’m a frontend engineer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My work thrives at the intersection of creativity and technology, where I transform complex ideas into seamless, high-performing digital experiences.
              <br /><br />
              Over the years, I've developed software across a variety of industries — from building the entire front-end architecture at Mesmo to leading cross-platform solutions for startups like Jumeeya and Teff. Whether optimizing applications for scale or designing features that elevate usability, I bring a detail-oriented approach that prioritizes both performance and inclusivity.
              <br /><br />
              When I’m not coding, I enjoy exploring creative outlets like digital art and music production, finding inspiration in the overlap between artistry and technology. I’m also passionate about staying ahead of industry trends, constantly learning, and pushing the boundaries of what’s possible in web and mobile development.
            </p>
            {isMobile ? <h3 className={styles.headersMobile}>Experience</h3> : <></>}
            <div ref={experienceSection}>
              <Experience
                index={0}
                year="2024-2024"
                role="Mesmo - Frontend Developer"
                description="Built the front-end architecture from scratch with React Native, delivering a modern, efficient user experience and maintaining comprehensive documentation for seamless future development."
                skills={["React Native", "TypeScript", "CSS"]}
              />
              <Experience
                index={1}
                year="2022-2023"
                role="Bazar - Frontend Developer"
                description="Led development of inventory tools for mobile merchants, collaborated on feature planning, mitigated technical debt, and transitioned a Swift app to React Native."
                skills={["React Native", "TypeScript", "CSS"]}
              />
              <Experience
                index={2}
                year="2022-2022"
                role="Jumeeya-Frontend Developer"
                description="Led Android development for a closed beta, ensured cross-platform compatibility, and unified the UI with responsive CSS for diverse devices."
                skills={["React Native", "TypeScript", "CSS"]}
              />
              <Experience
                index={3}
                year="2021-2021"
                role="Teff-Frontend Developer"
                description="Designed custom React hook-based authentication, led efforts to increase test coverage with Jest, and built features interfacing with internal APIs."
                skills={["React", "Javascript", "TypeScript", "CSS", "HTML", "Jest"]}
              />
              <Experience
                index={4}
                year="2020-2021"
                role="Specranks-Fullstack Developer"
                description="Refactored pages for 70,000+ live product listings using modern React patterns, updated libraries for improved performance, identified potential bugs, and ensured thorough documentation throughout the process."
                skills={["React", "Javascript", "TypeScript", "CSS", "HTML", "Node.js", "SQL"]}
              />
              <Experience
                index={4}
                year="2019-2019"
                role="Specranks-Database Administrator"
                description="Collaborated on efficient database schema design, optimized structures for better data organization, and reorganized tables for simplified retrieval and reporting."
                skills={["SQL"]}
              />
            </div>
            <div className={styles.viewResume}>
              <a>View full resume </a>
              <FontAwesomeIcon className={styles.iconArrow} icon={faArrowRight} transform={{ rotate: 315 }} />
            </div>
            {isMobile ? <h3 className={styles.headersMobile}>Projects</h3> : <></>}
            <div ref={projectSection}>

              <Project
                index={1}
                image={codepenImg}
                alt="The front page of the codepen website which includes multiple images of other users work"
                text="Take a look at my CodePen portfolio to see some of the web experiments and creative coding projects I've been working on. It's where I explore ideas and try out new techniques in front-end development"
              />
              <Project
                index={0}
                image={openprocessingImg}
                alt="The front page of the openprocessing website which includes multiple images of other users work"
                text="Explore my OpenProcessing portfolio, where creativity meets code. Dive into dynamic animations, playful visual experiments, and engaging digital art pieces"
              />
            </div>
            <div className={styles.anchorStyle}>
              <p>Loosely designed in
                <a href="https://www.figma.com/"> Figma</a> and coded in
                <a href="https://code.visualstudio.com/"> Visual Studio Code.</a> Built from scratch with
                <a href="https://react.dev/"> React.js.</a> The two fonts used are
                <a href="https://fonts.google.com/specimen/Zen+Dots"> Zen Dots</a> and
                <a href="https://fonts.google.com/specimen/Michroma"> Michroma</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.outerRightContainer}></div>
    </div>
  )
}
export default Homepage;
