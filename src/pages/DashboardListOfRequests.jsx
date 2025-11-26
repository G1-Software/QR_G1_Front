import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "./Loader.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { RequestTable } from "../components/RequestTable.jsx";
import { RequestFilters } from "../components/RequestFilters.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { apiUrl } from "../config/api.js";
import { AdminNavbar } from "../components/AdminNavbar.jsx";
import { RequestsDashboard } from "./RequestsDashboard.jsx"; // IMPORTANTE

export function DashboardListOfRequests() {
  const [view, setView] = useState("list"); // 👈 NUEVO: controla qué se muestra

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

      const response = await axios.get(
        `${apiUrl}/request?${params.toString()}`
      );

      setRequests(response.data.data || []);
      setPagination(response.data.pagination || null);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error al obtener las solicitudes"
      );
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
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const updateRequestStatus = async (id, newStatus) => {
    try {
      setIsUpdating(true);

      await axios.put(`${apiUrl}/request/${id}`, {
        status: newStatus,
      });

      await fetchRequests(filters, page, true);
    } catch (err) {
      console.error("Error al actualizar solicitud:", err);
      alert("Error al actualizar la solicitud.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading && !isUpdating && view === "list") return <Loader />;
  if (error) return <ErrorPage message={error} />;

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
