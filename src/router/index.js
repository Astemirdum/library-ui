
import Libraries from "../pages/Libraries";
import Books from "../pages/Books";
import Login from "../pages/Login";
import Rating from "../pages/Rating";
import Stats from "../pages/Stats";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Reservations from "../pages/Reservations";


export const privateRoutes = [
    {path: '/libraries', component: Libraries, exact: true},
    {path: '/libraries/:libraryUid/books', component: Books, exact: true},
    {path: '/reservations', component: Reservations, exact: true},
    {path: '/rating', component: Rating, exact: true},
    {path: '/stats', component: Stats, exact: true},
    {path: '/', component: Home, exact: true},
]

export const publicRoutes = [
    {path: '/', component: Home, exact: true},
    {path: '/signup', component: Signup, exact: true},
    {path: '/login', component: Login, exact: true},
]
