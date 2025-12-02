import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { opiskelijat } from "../mockData/opiskelijat";
import { kurssit } from "../mockData/kurssit";
import { kurssiOsallistuminen } from "../mockData/kurssiOsallistuminen";
import LayoutCard from "../components/LayoutCard";
import { studentFrontStyles as styles } from "../styles/commonStyles";
import { dsStyles } from "../styles/dsStyles";
import { vuosikurssit } from "../mockData/vuosikurssit";

export default function TeacherStudentDetailsPage({ opiskelijaId = 1 }) {
    const { courseId, yearId, groupId } = useParams();
    const opiskelija = opiskelijat.find((o) => o.id === opiskelijaId);
    const [query, setQuery] = useState("");

    // Year for breadcrumbs
    const year = vuosikurssit.find((y) => y.id === parseInt(yearId));
    const course = kurssit.find((c) => c.id === parseInt(courseId));

    // Kurssit oppilaalle + progress + search + year filter
    const kurssitOppilaalle = kurssit
        .filter((c) => {
            const matchesYear = yearId
                ? c.vuosikurssiId === parseInt(yearId)
                : true;
            const matchesQuery =
                c.nimi.toLowerCase().includes(query.toLowerCase()) ||
                (c.kurssitunnus || "").toLowerCase().includes(query.toLowerCase());
            return matchesYear && matchesQuery;
        })
        .sort((a, b) => a.nimi.localeCompare(b.nimi))
        .map((k) => {
            const osallistuminen = kurssiOsallistuminen.find(
                (ko) => ko.opiskelijaId === opiskelija.id && ko.id === k.id
            );
            return {
                ...k,
                tila: osallistuminen?.tila || "kesken",
                tehtavatValmiina: osallistuminen?.tehtavatValmiina || 0,
                tehtavatYhteensa: osallistuminen?.tehtavatYhteensa || 0,
            };
        });

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
                {/* Breadcrumbs */}
                <div style={{ marginTop: "-10px", marginBottom: "30px" }}>
                    <ds-link
                        ds-text="Kotisivu"
                        ds-icon="chevron_forward"
                        ds-weight="bold"
                        ds-href="/"
                    />
                    {year && (
                        <ds-link
                            ds-text={year.nimi}
                            ds-icon="chevron_forward"
                            ds-weight="bold"
                            ds-href={`/teacherYears`}
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
                        ds-text={`Ryhmä ${groupId}`}
                        ds-icon="chevron_forward"
                        ds-weight="bold"
                        ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups`}
                    />
                    <ds-link
                        ds-text={`Opiskelijat`}
                        ds-weight="bold"
                        ds-href={`/teacherYears/${yearId}/teacherCourses/${courseId}/groups/${groupId}`}
                    />
                </div>

                {/* Student name */}
                <h1 style={dsStyles.pageTitle}>
                    {opiskelija.etunimi} {opiskelija.sukunimi}: {opiskelija.opiskelijanumero}
                </h1>

                {/* Search input */}
                <ds-text-input
                    style={dsStyles.textInput}
                    ds-placeholder="Hae kurssia tai tunnusta"
                    ds-icon="search"
                    value={query}
                    onInput={(e) => setQuery(e.target.value)}
                />

                {/* Courses list */}
                <div style={styles.itemContainer}>
                    {kurssitOppilaalle.length === 0 ? (
                        <p>Ei tuloksia.</p>
                    ) : (
                        kurssitOppilaalle.map((k) => {
                            const completed = k.tehtavatValmiina || 0;
                            const total = k.tehtavatYhteensa || 0;
                            const progressPercent = total > 0 ? Math.floor((completed / total) * 100) : 0;

                            {/* Opiskelijan kurssikortit */ }
                            return (
                                <ds-card
                                    key={k.id}
                                    onClick={() =>
                                        alert(`Siirryt suoritekortille: ${k.nimi}`)
                                    }
                                    ds-heading={k.nimi}
                                    ds-eyebrow={k.kurssitunnus || ""}
                                    ds-url="#"
                                    ds-url-target="_self"
                                    ds-subtitle={`Edistyminen ${k.tehtavatValmiina || 0}/${k.tehtavatYhteensa || 0
                                        }`}
                                    ds-tag="Kurssi"
                                    ds-horizontal="false"
                                >
                                    <div
                                        slot="content"                >
                                        <div
                                            style={dsStyles.progressBarContainer}
                                        >
                                            <div
                                                style={{
                                                    ...dsStyles.progressBarFill,
                                                    width: `${progressPercent}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </ds-card>
                            );
                        })
                    )}
                </div>
            </LayoutCard>
        </div>
    );
}
