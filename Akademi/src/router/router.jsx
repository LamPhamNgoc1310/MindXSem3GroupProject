// teacher
import Login from "../login/Login.jsx";
import AddNewStudent from "../teacher/AddNewStudent.jsx";
import Dashboard from "../teacher/Dashboard.jsx";
import Event from "../teacher/Event.jsx";
import StudentGrades from "../teacher/StudentGrades.jsx";
import StudentsManagement from "../teacher/StudentsManagement.jsx";
import TeacherTimeline from "../teacher/TeacherTimeline.jsx";
import UserTeacher from "../teacher/UserTeacher.jsx";

import Admin from "../admin/Admin.jsx";
import AdminTeacherMan from "../admin/AdminTeacherMan.jsx";
import AdminClassMan from "../admin/AdminClassMan.jsx";
import AdminSchedule from "../admin/AdminSchedule.jsx";
import AdminCurriculum from "../admin/AdminCurriculum.jsx";

// admin

// student

const publicRouter = [
  {
    path: "/",
    component: <Login />,
  },
];

const privateRouter = {
  // Lâm - admin
  admin: [
    {
      path: "/admin",
      component: <Admin />,
    },
    {
      path: "/admin/teacherman",
      component: <AdminTeacherMan />,
    },
    {
      path: "/admin/classman",
      component: <AdminClassMan />,
    },
    {
      path: "/admin/schedule",
      component: <AdminSchedule />,
    },
    {
      path: "/admin/curriculum",
      component: <AdminCurriculum />,
    },
  ],

  // Đức - teacher
  teacher: [
    { path: "/u/dashboard", component: <Dashboard /> },
    { path: "/u/event", component: <Event /> },
    { path: "/u/students", component: <StudentsManagement /> },
    { path: "/u/students/add", component: <AddNewStudent /> },
    { path: "/u/latest-activity", component: <TeacherTimeline /> },
    { path: "/u/grades", component: <StudentGrades /> },
    { path: "/u/userTeacher", component: <UserTeacher /> },
  ],
  // Quang - student
  // {
  //     path: '/student', component: <StudentPersonalInfo />
  // },
  // {
  //     path: '/student/academic', component: <StudentAcademic />
  // },
  // {
  //     path: '/student/schedule', component: <StudentSchedule />
  // }
};

export { publicRouter, privateRouter };
