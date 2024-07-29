import { Navigate, Outlet, Route, Routes } from "react-router-dom";

function ProtectedRoute({ user, redirectPath = "/" }) {
    if (!user) return <Navigate to={redirectPath} replace />;

    return <Outlet />;
}

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/client_dashboard" element={<ClientDashboard />} />
                <Route
                    path="/trainer_dashboard"
                    element={<TrainerDashboard />}
                />

                {/* Will need to incorporate protected route here once login and user functionality is incoororated */}

                <Route path="*" element={<NothingFound />} />
            </Routes>
        </>
    );
}

export default App;
