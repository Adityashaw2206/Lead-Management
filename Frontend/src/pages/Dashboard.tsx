import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CSVLink } from "react-csv";
import { getLeads, createLead, updateLead, deleteLead } from "../api/leadApi";
import type { Lead } from "../types/lead.types";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  //LEADS STATES

  const [leads, setLeads] = useState<Lead[]>([]);

  //CREATE FORM STATES

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("new");
  const [source, setSource] = useState("website");

  //FILTER STATES

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [sort, setSort] = useState("latest");

  //PAGINATION STATES

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //EDIT STATES

  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editStatus, setEditStatus] = useState("new");
  const [editSource, setEditSource] = useState("website");

  //DARK MODE

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  //FETCH LEADS

  const fetchLeads = useCallback(async () => {
    try {
      const filters = {
        search: debouncedSearch,
        status: filterStatus,
        source: filterSource,
        sort,
        page,
      };

      const data = await getLeads(filters);

      setLeads(data.leads);

      setTotalPages(data.pagination.totalPages);
    } catch {
      toast.error("Failed to fetch leads");
    }
  }, [debouncedSearch, filterStatus, filterSource, sort, page]);

  useEffect(() => {
    const loadLeads = async () => {
      await fetchLeads();
    };

    loadLeads();
  }, [fetchLeads]);

  //DEBOUNCE EFFECT

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  //LOAD SAVED THEME

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  //CREATE LEAD

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const leadData = {
        name,
        email,
        status,
        source,
      };

      await createLead(leadData);
      toast.success("Lead Created");

      // RESET FORM

      setName("");
      setEmail("");
      setStatus("new");
      setSource("website");

      // REFRESH LEADS

      fetchLeads();
    } catch {
      toast.error("Failed to create lead");
    }
  };

  //START EDIT

  const startEditing = (lead: Lead) => {
    setEditingLeadId(lead._id);
    setEditName(lead.name);
    setEditEmail(lead.email);
    setEditStatus(lead.status);
    setEditSource(lead.source);
  };

  //UPDATE LEAD

  const handleUpdateLead = async (id: string) => {
    try {
      const updatedData = {
        name: editName,
        email: editEmail,
        status: editStatus,
        source: editSource,
      };

      await updateLead(id, updatedData);
      toast.success("Lead Updated");
      setEditingLeadId(null);

      fetchLeads();
    } catch {
      toast.error("Failed to update lead");
    }
  };

  //DELETE LEAD

  const handleDeleteLead = async (id: string) => {
    try {
      await deleteLead(id);
      toast.success("Lead Deleted");
      fetchLeads();
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  //LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  //TOGGLE THEME

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  //CSV

  const csvData = leads.map((lead) => ({
    Name: lead.name,
    Email: lead.email,
    Status: lead.status,
    Source: lead.source,
  }));

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Smart Leads Dashboard</h1>

          <p className="mt-2 text-sm opacity-80">
            Logged in as:
            <span className="font-bold ml-2 uppercase">{user.role}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* DARK MODE */}

          <button
            onClick={toggleTheme}
            className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300 text-white px-5 py-2 rounded-lg"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* EXPORT CSV */}

          {user.role === "admin" && (
            <CSVLink
              data={csvData}
              filename="leads.csv"
              className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 text-white px-5 py-2 rounded-lg"
            >
              Export CSV
            </CSVLink>
          )}

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/*CREATE LEAD FORM*/}

      <form
        onSubmit={handleCreateLead}
        className={`p-6 rounded-xl shadow mb-10 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-5">Create Lead</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* NAME */}

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg text-black"
          />

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg text-black"
          />

          {/* STATUS */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-3 rounded-lg text-black"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>

          {/* SOURCE */}

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border p-3 rounded-lg text-black"
          >
            <option value="website">Website</option>
            <option value="instagram">Instagram</option>
            <option value="referral">Referral</option>
          </select>
        </div>

        {/* CREATE BUTTON */}

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-lg mt-5"
        >
          Create Lead
        </button>
      </form>

      {/* FILTER SECTION */}

      <div
        className={`p-6 rounded-xl shadow mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg text-black"
          />

          {/* STATUS FILTER */}

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-3 rounded-lg text-black"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>

          {/* SOURCE FILTER */}

          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="border p-3 rounded-lg text-black"
          >
            <option value="">All Sources</option>
            <option value="website">Website</option>
            <option value="instagram">Instagram</option>
            <option value="referral">Referral</option>
          </select>

          {/* SORT */}

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-3 rounded-lg text-black"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* LEADS GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className={`p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {editingLeadId === lead._id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-2 rounded-lg w-full mb-3 text-black"
                />

                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="border p-2 rounded-lg w-full mb-3 text-black"
                />

                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="border p-2 rounded-lg w-full mb-3 text-black"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                </select>

                <select
                  value={editSource}
                  onChange={(e) => setEditSource(e.target.value)}
                  className="border p-2 rounded-lg w-full mb-3 text-black"
                >
                  <option value="website">Website</option>
                  <option value="instagram">Instagram</option>
                  <option value="referral">Referral</option>
                </select>

                {/* SAVE */}

                <button
                  onClick={() => handleUpdateLead(lead._id)}
                  className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 text-white px-4 py-2 rounded-lg mr-3"
                >
                  Save
                </button>

                {/* CANCEL */}

                <button
                  onClick={() => setEditingLeadId(null)}
                  className="bg-gray-500 hover:bg-gray-600 hover:scale-105 transition-all duration-300 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-2">{lead.name}</h2>

                <p className="mb-2 text-gray-400">{lead.email}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Created:
                  {new Date(lead.createdAt).toLocaleString()}
                </p>
                <div className="flex items-center justify-between mt-4 mb-5">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {lead.status}
                  </span>

                  <span className="text-sm text-gray-400">{lead.source}</span>
                </div>

                {/* ACTION BUTTONS */}

                <div className="flex gap-3">
                  {/* EDIT */}

                  <button
                    onClick={() => startEditing(lead)}
                    className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  {/* DELETE */}

                  {user.role === "admin" && (
                    <button
                      onClick={() => handleDeleteLead(lead._id)}
                      className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/*PAGINATION*/}

      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
