import './About.css';
import BackButton from '../components/BackButton';

function useReveal() {
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (ref.current) ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function About() {
  const pageRef = useReveal();

  return (
    <div className="about-page" ref={pageRef}>
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <BackButton />
          <h1 className="page-hero-title">About Us</h1>
          <p className="page-hero-subtitle">Learn about our department, association, and symposium</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-block reveal">
            <div className="about-block-icon">🏛️</div>
            <div className="about-block-content">
              <h2 className="about-block-title">About the Department</h2>
              <p>The Department of Mechanical Engineering at Government College of Engineering, Erode was established with a vision to produce competent engineers who can contribute to the advancement of technology and society. The department offers undergraduate and postgraduate programs with state-of-the-art laboratories and experienced faculty members.</p>
              <p>With a strong emphasis on both theoretical knowledge and practical skills, the department has produced numerous successful engineers who have gone on to excel in various industries and research institutions worldwide. The department actively promotes research, innovation, and industry collaboration.</p>
            </div>
          </div>

          <div className="about-block reveal">
            <div className="about-block-icon">🤝</div>
            <div className="about-block-content">
              <h2 className="about-block-title">About Mechanical Engineering Association</h2>
              <p>The Mechanical Engineering Association (MEA) is a vibrant student organization that bridges the gap between academics and industry. It serves as a platform for students to develop their technical, managerial, and leadership skills through a variety of events, workshops, and guest lectures organized throughout the academic year.</p>
              <p>MEA is committed to fostering innovation and creativity among students. Through regular technical workshops, industrial visits, and collaborative projects, the association ensures that students are well-prepared for the challenges of the modern engineering landscape.</p>
            </div>
          </div>

          <div className="about-block reveal">
            <div className="about-block-icon">🚀</div>
            <div className="about-block-content">
              <h2 className="about-block-title">About <span className="golden-text">EFFICACY'26</span></h2>
              <p><span className="golden-text" style={{fontWeight: 600}}>EFFICACY'26</span> is the flagship annual technical symposium organized by the Department of Mechanical Engineering at GCE Erode. It is a grand celebration of engineering excellence that brings together the brightest minds from colleges across Tamil Nadu and beyond.</p>
              <p>The symposium features a diverse array of events including paper presentations, project exhibitions, technical quizzes, CAD designing competitions, hands-on workshops, and much more. EFFICACY provides a unique platform for students to showcase their talents, network with peers, and learn from industry experts.</p>
              <p>With its focus on innovation, creativity, and technical prowess, <span className="golden-text" style={{fontWeight: 600}}>EFFICACY'26</span> has grown to become one of the most anticipated events in the engineering college calendar. Each year, hundreds of participants compete for glory and prizes, making it a truly enriching experience for all involved.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
