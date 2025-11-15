import React, { useState } from "react"; 
import { ryhmat } from "../mockData/ryhmat";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";

export default function TeacherGroupsPage() {
  const navigate = useNavigate();
  const { courseName, yearId } = useParams();
  const [activeView, setActiveView] = useState("groups"); // "groups" or "cards"

  // Ryhmät aakkosjärjestyksessä
  const ryhmalistaus = ryhmat.sort((a, b) => a.nimi.localeCompare(b.nimi));

  // Placeholder for cards - you can add mock data later
  const kortit = [];

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <>
            <div style={styles.headerRow}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <div style={styles.topRight}>
                <span style={styles.filter}>Suodata: Kaikki</span>
                <span style={styles.hamburger}>☰</span>
              </div>
            </div>
          </>
        }
        dividerStyle={{ backgroundColor: "#00000022" }}
        contentStyle={{ padding: "15px 30px" }}
        footer={<p style={styles.footerText}>@Helsingin Yliopisto</p>}
      >
        {/* Takaisin-painike */}
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Takaisin
        </button>

        {/* Välilehdet */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            style={{
              ...styles.primaryButton,
              backgroundColor: activeView === "groups" ? "#007bff" : "#6c757d",
              padding: "10px 20px",
              fontSize: "16px",
            }}
            onClick={() => setActiveView("groups")}
          >
            Ryhmät
          </button>
          <button
            style={{
              ...styles.primaryButton,
              backgroundColor: activeView === "cards" ? "#007bff" : "#6c757d",
              padding: "10px 20px",
              fontSize: "16px",
            }}
            onClick={() => setActiveView("cards")}
          >
            Kortit
          </button>
        </div>

        {activeView === "groups" ? (
          <>
            <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
              {ryhmalistaus.length > 0 ? ryhmalistaus[0].kurssitunnus : ""}: Ryhmät
            </h1>

            {/* Ryhmät isona painikkeena */}
            <div style={styles.itemContainer}>
              {ryhmalistaus.map((ryhma) => {
                return (
                  <button
                    key={ryhma.id}
                    style={styles.itemButton}
                    onClick={() => alert(`Siirryt ryhmään: ${ryhma.nimi}`)}
                  >
                    <div style={styles.courseInfo}>
                      <div>
                        <p>{ryhma.nimi}</p>
                      </div>
                      <div style={styles.arrow}>→</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
              {ryhmalistaus.length > 0 ? ryhmalistaus[0].kurssitunnus : ""}: Kortit
            </h1>

            {/* Kortit isona painikkeena */}
            <div style={styles.itemContainer}>
              {kortit.length === 0 ? (
                <p>Ei vielä kortteja. Lisää uusi kortti.</p>
              ) : (
                kortit.map((kortti) => {
                  return (
                    <button
                      key={kortti.id}
                      style={styles.itemButton}
                      onClick={() => alert(`Siirryt korttiin: ${kortti.nimi}`)}
                    >
                      <div style={styles.courseInfo}>
                        <div>
                          <p>{kortti.nimi}</p>
                        </div>
                        <div style={styles.arrow}>→</div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Lisää kortti -painike */}
            <button
              style={{
                ...styles.primaryButton,
                marginTop: "20px",
                padding: "12px 24px",
                fontSize: "16px",
                width: "100%",
              }}
              onClick={() => {
                const route = yearId 
                  ? `/teacherYears/${yearId}/teacherCourses/${courseName}/teacherCards`
                  : `/teacherCourses/${courseName}/teacherCards`;
                navigate(route);
              }}
            >
              + Luo uusi kortti
            </button>
          </>
        )}
      </LayoutCard>
    </div>
  );
}
