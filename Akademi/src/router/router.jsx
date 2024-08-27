// import 

const publicRouter = [
    {
        path: '/', component: <Landing/>
    },
    // Quang
    {
        path: '/signin', component: <Signin/>
    },
    {
        path: '/login', component: <Login/>
    },
]

const privateRouter = [
    // Lâm - admin
    {
        path: '/admin', component: <Admin/>
    },
    {
        path: '/admin/teacherman', component: <AdminTeacherMan/>
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
    {
        path: '', component: ''
    },
    // Quang - student
    {
        path: '/student', component: <StudentPersonalInfo/>
    },
    {
        path: '/student/academic', component: <StudentAcademic/>
    },
    {
        path: '/student/schedule', component: <StudentSchedule/>
    }
]