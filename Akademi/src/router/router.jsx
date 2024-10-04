import Admin from "../admin/Admin.jsx"
import AdminClassMan from "../admin/AdminClassMan.jsx"
import AdminTeacherMan from "../admin/AdminTeacherMan.jsx"
import AdminSchedule from "../admin/AdminSchedule.jsx"
import AdminCurriculum from "../admin/AdminCurriculum.jsx"
import AdminAddTeacher from "../admin/AdminAddTeacher.jsx"

// const publicRouter = [
//     {
//         path: '/', component: <Landing/>
//     },
//     // Quang
//     {
//         path: '/signin', component: <Signin/>
//     },
//     {
//         path: '/login', component: <Login/>
//     },
// ]

const privateRouter = [
    // Lâm - admin
    {
        path: '/admin', component: <Admin/>
    },
    {
        path: '/admin/teacherman', component: <AdminTeacherMan/>
    },
    {
        path: '/admin/teacherman/addteacher', component: <AdminAddTeacher/>
    },
    {
        path: '/admin/classman', component: <AdminClassMan/>
    },
    {
        path: '/admin/schedule', component: <AdminSchedule/>
    },
    {
        path: '/admin/curriculum', component: <AdminCurriculum/>
    },

    // Đức - teacher
    // {
    //     path: '/teacher', component: <TeacherPersonal/>
    // },
    // {
    //     path: '/teacher/studentman', component: <TeacherStudentMan/>
    // },
    // {
    //     path: '/teacher/grades', component: <TeacherStudentGrades/>
    // },
    // {
    //     path: '/teacher/schedule', component: <TeacherSchedule/>
    // },
    // {
    //     path: '/teacher/notification', component: <TeacherNotification/>
    // },

    // Quang - student
    // {
    //     path: '/student', component: <StudentPersonalInfo/>
    // },
    // {
    //     path: '/student/academic', component: <StudentAcademic/>
    // },
    // {
    //     path: '/student/schedule', component: <StudentSchedule/>
    // }
]

export {privateRouter}