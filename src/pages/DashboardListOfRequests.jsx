import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "./Loader.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { RequestTable } from "../components/RequestTable.jsx";
import { RequestFilters } from "../components/RequestFilters.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { apiUrl } from "../config/api.js";
import { AdminNavbar } from "../components/AdminNavbar.jsx";

export function DashboardListOfRequests() {
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
  const [error, setError] = useState(null);

  const fetchRequests = async (appliedFilters = {}, currentPage = 1) => {
    try {
      setLoading(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(filters, page);
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const updateRequestStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`${apiUrl}/request/${id}`, {
        status: newStatus,
      });
      const updated = response.data.data;
      setRequests((prev) => prev.map((req) => (req.id === id ? updated : req)));
    } catch (err) {
      console.error("Error al actualizar solicitud:", err);
      alert("Error al actualizar la solicitud.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error} />;

  return (
    <main className="dashboard-container">
      <AdminNavbar></AdminNavbar>
      <h2 className="dashboard-title">Listado de Solicitudes</h2>

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
