import {
    Route,
    Routes,
    BrowserRouter as Router,
} from "react-router-dom"
import { Auth, Dashboard, Groups, Messages, SendMessage, Users } from "./pages"
import { SignIn } from "./pages/Auth/sign-in"
import { SignUp } from "./pages/Auth/sign-up"
import { RequireAuth, RequiresGroups, RequiresMessages, RequiresAdmin } from "./Wrappers"
import { useSelector } from "react-redux"
import { RootState } from "./store"

export const AppRoutes = () => {
    const { currentUser } = useSelector((state: RootState) => state.user)
    return <Router>
        <Routes >
            <Route path='/' element={<Auth />}>
                <Route element={<SignUp />} path='/sign-up' />
                <Route element={<SignIn />} path="/" />
            </Route>
            <Route path='/sendmessage' element={
                <RequireAuth id={currentUser.id}>
                    <RequiresGroups>
                        <SendMessage role={currentUser.role} />
                    </RequiresGroups>
                </RequireAuth>
            } />
            <Route path='/insights' element={
                <RequireAuth id={currentUser.id}>
                    <RequiresAdmin role={currentUser.role}>
                        <Dashboard />
                    </RequiresAdmin>
                </RequireAuth>} />
            <Route path='/users' element={
                <RequireAuth id={currentUser.id}>
                    <RequiresAdmin role={currentUser.role}>
                        <Users />
                    </RequiresAdmin>
                </RequireAuth>} />
            <Route path='/messages' element={<RequireAuth id={currentUser.id}>
                <RequiresMessages>
                    <Messages />
                </RequiresMessages>
            </RequireAuth>} />
            <Route path='/groups' element={<RequireAuth id={currentUser.id}>
                <RequiresGroups>
                    <Groups role={currentUser.role} />
                </RequiresGroups>
            </RequireAuth>} />
        </Routes>
    </Router>
}