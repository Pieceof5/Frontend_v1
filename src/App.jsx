import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherCoursesPage from "./pages/TeacherCoursesPage";
import TeacherCourseDetailPage from "./pages/TeacherCourseDetailPage";
import StudentFrontPage from "./pages/StudentFrontPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacherCourses" element={<TeacherCoursesPage />} />
        <Route path="/teacherCourses/:courseName" element={<TeacherCourseDetailPage />} />
        <Route path="/studentCourses" element={<StudentFrontPage />} />
      </Routes>
    </Router>
  );
}

export default App;
