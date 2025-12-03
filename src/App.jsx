import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherCoursesPage from "./pages/TeacherCoursesPage";
import TeacherAddCardPage from "./pages/TeacherAddCardPage";
import TeacherYearsPage from "./pages/TeacherYearsPage";
import TeacherGroupsPage from "./pages/TeacherGroupsPage";
import TeacherStudentListPage from "./pages/TeacherStudentListPage";
import TeacherStudentDetailsPage from "./pages/TeacherStudentDetailsPage";
import TeacherStudentTasksPage from "./pages/TeacherStudentTasksPage";

import StudentTasksPage from "./pages/StudentTasksPage";
import StudentFrontPage from "./pages/StudentFrontPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Teacher routes */}
        <Route path="/teacherYears" element={<TeacherYearsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses" element={<TeacherCoursesPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups" element={<TeacherGroupsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/teacherAddCards" element={<TeacherAddCardPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/:groupId" element={<TeacherStudentListPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/:groupId/studentDetails/:studentId" element={<TeacherStudentDetailsPage />} />
        <Route path="/teacherYears/:yearId/teacherCourses/:courseId/groups/:groupId/studentDetails/:studentId/studentTasks" element={<TeacherStudentTasksPage />} />

        {/* Student routes */}
        <Route path="/studentCourses" element={<StudentFrontPage />} />
        <Route path="/studentCourses/:courseId/studentTasks" element={<StudentTasksPage />} />

      </Routes>
    </Router>
  );
}

export default App;
