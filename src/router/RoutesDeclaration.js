import React from 'react';
const Main = React.lazy(() => import('../container/Main'));
const Profile = React.lazy(() => import('../components/Profile'));
const EditProfile = React.lazy(() => import('../components/EditProfile'));
const MyNetwork = React.lazy(() => import('../components/MyNetwork'));
const Jobs = React.lazy(() => import('../components/Jobs'));
const Job = React.lazy(() => import('../components/Job'));
const SignIn = React.lazy(() => import('../components/auth/SignIn'));
const Register = React.lazy(() => import('../components/auth/Register'));
const HomePage = React.lazy(() => import('../components/HomePage'));


export const routesDeclaration = (user) => {
    return {
        path: '/',
        component: HomePage,
        name: 'Home',
        children: [
            {
                path: '/feed',
                name: 'Feed',
                component: Main,
            },
            {
                path: '/profile',
                name: 'ProfileOverview',
                component: Profile,
                children: [
                    {
                        path: '/profile/:userId',
                        name: 'OutsideProfileView',
                        component: Profile
                    },
                    {
                        path: '/profile/edit/:userId',
                        name: 'EditProfile',
                        component: EditProfile
                    },
                ]
            },
            {
                path: '/network',
                name: 'Network',
                component: MyNetwork
            },
            {
                path: '/jobs',
                name: 'Jobs',
                component: Jobs,
                children: [
                    {
                        path: '/jobs/:jobId',
                        name: 'Job',
                        component: Job
                    }
                ]
            },
            {
                path: '/signin',
                name: 'Signin',
                component: SignIn
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    };
}
