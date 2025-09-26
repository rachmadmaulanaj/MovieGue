import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ViewDetail from './pages/ViewDetail';

const RouteList = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="detail/:slug" element={<ViewDetail />} />
        </Routes >
    )
}

export default RouteList;