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
        path: '/adminstudentman', component: <AdminStudentMan/>
    },
    {
        path: '/adminteacherman', component: <AdminTeacherMan/>
    },
    {
        path: '/adminclassman', component: <AdminClassMan/>
    },
    {
        path: '/adminschedule', component: <AdminSchedule/>
    },
    {
        path: '/admincurriculum', component: <AdminCurriculum/>
    },

    // Đức - teacher
    {
        path: '', component: ''
    },
    // Quang - student
    {
        path: 'personalinfo', component: <PersonalInfo/>
    },
    {
        path: 'academic', component: <Academic/>
    },
    {
        path: 'schedule', component: <SchedulePage/>
    }
]