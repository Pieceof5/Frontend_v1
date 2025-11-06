import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import logo from "./assets/logo.png";
import TeacherFrontPage from "./TeacherFrontPage";

// HomePage pysyy ennallaan
function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div style={styles.textContainer}>
          <h1 style={styles.appName}>DigiDens</h1>
          <p style={styles.subtitle}>
            Helsingin Yliopiston<br /> Hammaslääketieteen oppimisympäristö
          </p>
        </div>

        <div style={styles.bottomContainer}>
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onClick={() => navigate("/teacher")}
            >
              Kirjaudu Sisään Opettajana
            </button>
            <button style={styles.button}>Kirjaudu Sisään Opiskelijana</button>
          </div>
          <p style={styles.alatunniste}>Helsingin Yliopisto</p>
        </div>
      </div>
    </div>
  );
}

// TeacherCoursesPage nyt näyttää logo + kurssilista + alatunniste
function TeacherCoursesPage() {
  const navigate = useNavigate();
  const courses = ["Kurssi 1", "Kurssi 2", "Kurssi 3"];

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div style={styles.textContainer}>
          <h1 style={styles.appName}>Valitse kurssi</h1>
          <p style={styles.subtitle}>Klikkaa kurssia jatkaaksesi tehtävien hallintaan</p>
        </div>

        <ul style={styles.courseList}>
          {courses.map((course, index) => (
            <li key={index} style={styles.courseItem}>
              <button
                style={styles.courseButton}
                onClick={() => navigate(`/teacher/${course}`)}
              >
                {course}
              </button>
            </li>
          ))}
        </ul>

        <p style={styles.alatunniste}>Helsingin Yliopisto</p>
      </div>
    </div>
  );
}

// TeacherFrontPage Wrapper
function TeacherFrontPageWrapper() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.app}>
      <div style={styles.frontPageContainer}>
        <button onClick={() => navigate("/teacher")} style={styles.backButton}>
          &larr; Takaisin kursseille
        </button>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{courseName}</h2>
        <TeacherFrontPage />
      </div>
    </div>
  );
}

// Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher" element={<TeacherCoursesPage />} />
        <Route path="/teacher/:courseName" element={<TeacherFrontPageWrapper />} />
      </Routes>
    </Router>
  );
}

// Tyylit
const styles = {
  app: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    padding: "40px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "40px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  frontPageContainer: {
    width: "100%",
    maxWidth: "900px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  },
  logo: {
    width: "50px",
    height: "auto",
    alignSelf: "flex-start",
    marginBottom: "10px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    marginBottom: "20px",
  },
  appName: {
    fontSize: "clamp(22px, 4vw, 36px)",
    fontWeight: "500",
    marginBottom: "2px",
    textTransform: "none",
    color: "#000000",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "clamp(16px, 2.5vw, 15px)",
    color: "#5C5C5C",
    lineHeight: "1.1",
    marginTop: "0px",
    textAlign: "center"
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    alignItems: "center",
  },
  button: {
    padding: "15px 20px",
    width: "100%",
    backgroundColor: "#48A39B",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "clamp(14px, 2.5vw, 18px)",
    fontWeight: "400",
  },
  alatunniste: {
    textAlign: "center",
    marginTop: "25px",
    fontSize: "17px",
    color: "#5C5C5C",
  },
  courseList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    marginTop: "20px",
  },
  courseItem: {},
  courseButton: {
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #48A39B",
    backgroundColor: "#48A39B",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },
  backButton: {
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    marginBottom: "10px",
    alignSelf: "flex-start"
  },
};

export default App;
