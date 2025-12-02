import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "./Loader.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { RequestTable } from "../components/RequestTable.jsx";
import { RequestFilters } from "../components/RequestFilters.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { apiUrl } from "../config/api.js";
import { AdminNavbar } from "../components/AdminNavbar.jsx";
import { RequestsDashboard } from "./RequestsDashboard.jsx";
import { buildErrorState } from "../utils/error.js";
import { useAuth0 } from "@auth0/auth0-react";

export function DashboardListOfRequests() {
  const { getAccessTokenSilently } = useAuth0();

  const [view, setView] = useState("list");
  const [requests, setRequests] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    area: "",
    subarea: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const buildAuthHeaders = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "read:requests update:requests",
        },
      });

      return {
        Authorization: `Bearer ${token}`,
      };
    } catch (error) {
      console.error("ERROR EN getAccessTokenSilently:", error);
      throw error;
    }
  };

  const fetchRequests = async (
    appliedFilters = {},
    currentPage = 1,
    skipLoading = false
  ) => {
    try {
      if (!skipLoading) setLoading(true);

      const params = new URLSearchParams();

      Object.entries(appliedFilters).forEach(([key, value]) => {
        if (value && value !== "all") params.append(key, value);
      });

      params.append("page", currentPage);
      params.append("limit", 10);

      const headers = await buildAuthHeaders();

      const response = await axios.get(
        `${apiUrl}/request?${params.toString()}`,
        { headers }
      );

      setRequests(response.data.data || []);
      setPagination(response.data.pagination || null);
    } catch (err) {
      console.error("ERROR FETCH:", err);
      setError(buildErrorState(err, "Error al obtener las solicitudes"));
    } finally {
      if (!skipLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "list") {
      fetchRequests(filters, page);
    }
  }, [filters, page, view]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      const isDifferent = Object.keys(newFilters).some(
        (key) => newFilters[key] !== prevFilters[key]
      );

      if (isDifferent) setPage(1);

      return newFilters;
    });
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const updateRequestStatus = async (id, newStatus) => {
    try {
      setIsUpdating(true);

      const headers = await buildAuthHeaders();

      await axios.put(
        `${apiUrl}/request/${id}`,
        { status: newStatus },
        { headers }
      );

      await fetchRequests(filters, page, true);
    } catch (err) {
      console.error("Error actualizando:", err);
      alert("Error al actualizar la solicitud.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading && !isUpdating && view === "list") return <Loader />;
  if (error) return <ErrorPage status={error.status} message={error.message} />;

  if (view === "dashboard") {
    return (
      <div className="dashboard-container">
        <AdminNavbar />
        <h2 className="dashboard-title padding-title">
          <span className="view-toggle" onClick={() => setView("list")}>
            ◀
          </span>
          Dashboard de métricas de solicitudes
        </h2>
        <RequestsDashboard embbed={true} />
      </div>
    );
  }

  return (
    <main className="dashboard-container">
      <AdminNavbar />

      <h2 className="dashboard-title">
        Listado de solicitudes
        <span className="view-toggle" onClick={() => setView("dashboard")}>
          ▶
        </span>
      </h2>

      <section className="filters-container">
        <RequestFilters filters={filters} onFilterChange={handleFilterChange} />
      </section>

      <div className="request-table">
        <RequestTable
          requests={requests}
          onUpdateStatus={updateRequestStatus}
        />
      </div>

      <div className="pagination-container">
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </main>
  );
}
