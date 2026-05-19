import API from "./axios";

export type LeadData = Record<string, unknown>;

const getToken = () => {
  return localStorage.getItem("token");
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};

export const getLeads = async (
  filters?: Record<string, unknown>
) => {

  const response = await API.get(
    "/leads",
    {
      headers: getHeaders(),
      params: filters,
    }
  );

  return response.data;
};

export const createLead = async (
  leadData: LeadData
) => {

  const response = await API.post(
    "/leads",
    leadData,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};


export const updateLead = async (
  id: string,
  updatedData: Record<string, unknown>
) => {

  const response = await API.put(
    `/leads/${id}`,
    updatedData,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};

export const deleteLead = async (
  id: string
) => {

  const response = await API.delete(
    `/leads/${id}`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};