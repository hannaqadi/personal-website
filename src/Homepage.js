import { useState, useEffect, useRef } from 'react';
import styles from './Homepage.module.css';
import sound from './you_read_my_mind.mp3'
// import Marquee from "react-fast-marquee";
// import { Marquee } from "@devnomic/marquee";
// import Marquee from "./Marquee"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faGoodreads } from '@fortawesome/free-brands-svg-icons';
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons';


const Homepage = () => {
  const [showVolume, setShowVolume] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(isMobile)
  const audioRef = useRef(null)
  const aboutSection = useRef(null)
  const experienceSection = useRef(null)


  const playlist = [
    { title: 'Now Playing: You read my mind by David Benoit', src: "./you_read_my_mind.mp3" }
  ]

  const handleSkip = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setIsPlaying(false);
  };

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

  const handleIconMutePlay = () => {
    handleVolumeIcon()
    playPause()
  }

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.mainContainer}>
      <audio
        ref={audioRef}
        onEnded={handleSkip}
        controls={false}
        src={sound}
      />
      <div className={styles.outerLeftContainer}>
        <marquee direction="up" className={styles.marquee}> {playlist[currentIndex].title} </marquee>
      </div>
      <div className={styles.centerGridContainer}>
        <div className={styles.leftContainer}>
          <div>
            <h1>Hanna Qadi</h1>
            <h2>Frontend Engineer</h2>
            <h3>I build accessible, pixel perfect digital experiences for the web and mobile devices.</h3>
          </div>
          {!isMobile ?
            <ul className={styles.listStyle}>
              <li>
                <div className={styles.listContainer} onClick={() => scrollToSection(aboutSection)}>
                  <div className={styles.line}></div>
                  <h4 className={styles.tabText}>About</h4>
                </div>
              </li>
              <li>
                <div className={styles.listContainer} onClick={() => scrollToSection(experienceSection)}>
                  <div className={styles.line}></div>
                  <h4 className={styles.tabText}>Experience</h4>
                </div>
              </li>
              <li>
                <div className={styles.listContainer}>
                  <div className={styles.line}></div>
                  <h4 className={styles.tabText}>Projects</h4>
                </div>
              </li>
              <li>
                <div className={styles.listContainer}>
                  <div className={styles.line}></div>
                  <h4 className={styles.tabText}>Contact</h4>
                </div>
              </li>
            </ul>
            : <></>}
          <div>
            <FontAwesomeIcon icon={faGithub} />
            <FontAwesomeIcon icon={faLinkedin} />
            <FontAwesomeIcon icon={faCodepen} />
            <FontAwesomeIcon icon={faGoodreads} />
          </div>
          <div className={styles.bottomRightIcons}>
            <FontAwesomeIcon icon={faUniversalAccess} />
            <FontAwesomeIcon icon={faForward} />
            {showVolume ? <FontAwesomeIcon icon={faVolumeHigh} onClick={handleIconMutePlay} /> : <FontAwesomeIcon icon={faVolumeXmark} onClick={handleIconMutePlay} />}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerGrid} ref={aboutSection}>
            {isMobile ? <h3>About</h3> : <></>}
            <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. <br></br>
              <br></br> Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              <br></br> <br></br> Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            </p>
            {isMobile ? <h3>Experience</h3> : <></>}
            <div className={styles.rightExperienceContainer} ref={experienceSection}>
              <p> 2024 2024</p>
              <div>
                <p>Mesmo - Frontend Developer
                  Developed the entire front-end architecture from scratch using React Native, ensuring a seamless and efficient user experience.
                  Maintained comprehensive documentation of the front-end codebase, facilitating easier future development and onboarding.
                  Leveraged cutting-edge tools and technologies to stay ahead of industry trends and deliver a modern, high-performing application.
                </p>
                <div className={styles.skillsContainer}>
                  <div className={styles.skill}>React Native</div>
                  <div className={styles.skill}>Typescript</div>
                  <div className={styles.skill}>CSS</div>
                </div>
              </div>
              <p>2022 2022</p>
              <div>
                <p>Jumeeya - Frontend Developer
                  Lead the Android efforts for a closed beta starting before the end of the year.
                  Configured mobile OS specific elements and packages to function properly between IOS and Android platforms.
                  Unified user interface across mobile OS and reconfigured CSS to be more responsive across device sizes and platforms.
                </p>
                <div className={styles.skillsContainer}>
                  <div className={styles.skill}>React Native</div>
                  <div className={styles.skill}>Typescript</div>
                  <div className={styles.skill}>CSS</div>
                </div>
              </div>
              <p> 2024 2024</p>
              <div>
                <p>Mesmo - Frontend Developer
                  Developed the entire front-end architecture from scratch using React Native, ensuring a seamless and efficient user experience.
                  Maintained comprehensive documentation of the front-end codebase, facilitating easier future development and onboarding.
                  Leveraged cutting-edge tools and technologies to stay ahead of industry trends and deliver a modern, high-performing application.
                </p>
                <div className={styles.skillsContainer}>
                  <div className={styles.skill}>React Native</div>
                  <div className={styles.skill}>Typescript</div>
                  <div className={styles.skill}>CSS</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={styles.outerRightContainer}>right</div>
    </div>
  )
}
export default Homepage;
