import { Route, Routes } from "react-router-dom"
import Lay_out_admin from "../layout/Lay_out_admin"
import List_Music from "../pages/admin/List_Music/List_Music"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Lay_out_admin />}>
                <Route path="/music" element={<List_Music />} />
            </Route>

        </Routes>
    )
}

export default Router