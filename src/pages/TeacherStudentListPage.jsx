import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { opiskelijat } from "../mockData/opiskelijat";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";
import { kurssit } from "../mockData/kurssit";

export default function TeacherStudentListPage() {
  const { courseId, yearId, groupId } = useParams();
  const [query, setQuery] = useState("");

  // Opiskelijat tässä ryhmässä
  const studentsInGroup = opiskelijat.filter(
    (student) => student.ryhmaId === parseInt(groupId)
  );

  // Filteröinti hakukyselyn perusteella
  const filteredStudents = studentsInGroup.filter((student) => {
    const q = query.toLowerCase();
    return (
      student.etunimi.toLowerCase().includes(q) ||
      student.sukunimi.toLowerCase().includes(q) ||
      student.opiskelijanumero.toString().includes(q)
    );
  });

  // Year for breadcrumbs
  const year = vuosikurssit.find((y) => y.id === parseInt(yearId));

  // Course for breadcrumbs
  const course = kurssit.find((c) => c.id === parseInt(courseId));

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
          <ds-link ds-text="Kotisivu" ds-icon="chevron_forward" ds-weight="bold" ds-href="/" />
          {year && (
            <ds-link
              ds-text={year.nimi}
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears/${yearId}/teacherCourses`}
            />
          )}
          {course && (
            <ds-link
              ds-text={course.nimi}
              ds-icon="chevron_forward"
              ds-weight="bold"
              ds-href={`/teacherYears/${yearId}/teacherCourses`}
            />
          )}
          <ds-link
            ds-text={`Ryhmä ${groupId}.`}
            ds-icon="chevron_forward"
            ds-weight="bold"
            ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups`}
          />
        </div>

        <h1 style={dsStyles.pageTitle}>Ryhmä {groupId}: Opiskelijat</h1>

        {/* Hakukenttä */}
        <ds-text-input
          style={dsStyles.textInput}
          ds-placeholder="Hae opiskelijoita"
          ds-icon="search"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
        />

        {/* Opiskelijalista */}
        <div style={styles.itemContainer}>
          {filteredStudents.map((student) => (
            <ds-card
              key={student.id}
              onClick={() =>
                alert(
                  `Siirryt suoritekortille: ${student.etunimi} ${student.sukunimi}`
                )
              }
              ds-eyebrow={student.opiskelijanumero}
              ds-heading={`${student.etunimi} ${student.sukunimi}`}
              ds-url="#"
              ds-url-target="_self"
            />
          ))}
        </div>
      </LayoutCard>
    </div>
  );
}
