import React, { useState } from "react";
import { ryhmat } from "../mockData/ryhmat";
import { opiskelijat } from "../mockData/opiskelijat";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";

export default function TeacherGroupsPage() {
  const navigate = useNavigate();
  const { courseName, yearId } = useParams();
  const [activeView, setActiveView] = useState("groups"); // "groups" or "cards"

  // Ryhmät aakkosjärjestyksessä
  const ryhmalistaus = ryhmat.sort((a, b) => a.nimi.localeCompare(b.nimi));

  // Function to count students in a group
  const getStudentCount = (ryhmaId) => {
    return opiskelijat.filter((student) => student.ryhmaId === ryhmaId).length;
  };

    // Get year info for breadcrumbs
    const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
  


  // Placeholder for cards - you can add mock data later
  const kortit = [];

  return (
    <div style={styles.app}>
      <LayoutCard
        header={
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ds-icon
              ds-name="ds_flame"
              ds-size="4rem"
              ds-colour="ds-palette-black-95"
            />
          </div>
        }
        footer={<p style={dsStyles.footer}>@Helsingin Yliopisto</p>}
      >

        {/* Navigointipalkit */}
        <div style={{ marginTop: "-10px", marginBottom: "30px" }}>
          <ds-link
            ds-text="Kotisivu"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href="/"
          />
          <ds-link
            ds-text="Lukuvuodet"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href="/teacherYears"
          />
          {year && (
            <ds-link
              ds-text={year.nimi}
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears/${yearId}/teacherCourses`}
            />
          )}
          <ds-link
            ds-text="Kurssit"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={yearId ? `/teacherYears/${yearId}/teacherCourses` : "/teacherCourses"}
          />
          <ds-link
            ds-text="Ryhmät ja kortit"
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={yearId ? `/teacherYears/${yearId}/teacherCourses/${courseName}` : `/teacherCourses/${courseName}`}
          >
          </ds-link>
        </div>


        {/* Välilehdet */}
        <div style={{ display: "flex", gap: "15px", }}>
          <ds-button
            ds-value="Ryhmät"
            ds-variant="supplementary"
            ds-colour="black"
            onClick={() => setActiveView("groups")}
          >
          </ds-button>
          <ds-button
            ds-value="Kortit"
            ds-variant="supplementary"
            ds-colour="black"
            onClick={() => setActiveView("cards")}
          >
          </ds-button>
        </div>

        {/* Ryhmänäkymä */}
        {activeView === "groups" ? (
          <>
            {/* Sivun otsikko */}
            <h1 style={dsStyles.pageTitle}>{courseName}: Ryhmät</h1>

            {/* Hakukenttä */}
            <ds-text-input
              style={{ width: "100%", marginBottom: "20px" }}
              ds-placeholder="Hae ryhmiä"
              ds-icon="search"
            ></ds-text-input>


            {/* Ryhmät isona painikkeena */}
            <div style={styles.itemContainer}>
              {ryhmalistaus.map((ryhma) => {
                const studentCount = getStudentCount(ryhma.id);
                return (
                  <ds-card
                    key={ryhma.id}
                    ds-heading={ryhma.nimi}
                    ds-subtitle={`${studentCount} opiskelijaa`}
                    ds-url={yearId
                      ? `/teacherYears/${yearId}/teacherCourses/${courseName}/group/${ryhma.id}`
                      : `/teacherCourses/${courseName}/group/${ryhma.id}`}
                    ds-url-target="_self"
                  >
                  </ds-card>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Korttinäkymä */}
            <h1 style={dsStyles.pageTitle}>{courseName}: Kortit</h1>

            {/* Hakukenttä */}
            <ds-text-input
              style={{ width: "100%", marginBottom: "20px" }}
              ds-placeholder="Hae kortteja"
              ds-icon="search"
            ></ds-text-input>


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
            <div style={{ ...dsStyles.buttonContainer, marginTop: "120px" }}>
              <ds-button
                ds-value="Luo uusi kortti"
                ds-icon="edit"
                ds-full-width="true"

                onClick={() => {
                  const route = yearId
                    ? `/teacherYears/${yearId}/teacherCourses/${courseName}/teacherCards`
                    : `/teacherCourses/${courseName}/teacherCards`;
                  navigate(route);
                }}
              >
              </ds-button>

            </div>
          </>
        )}
      </LayoutCard>
    </div>
  );
}
