import { DataProvider } from "@refinedev/core";
import queryString from "query-string";
import axios from "axios";
import { API_URL } from "./constants";


const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters }) => {
    const url = `${API_URL}/${resource}`;

    const current = pagination?.current || 1;
    const pageSize = pagination?.pageSize || 10;

    const sort = sorters?.[0];
    const sortField = sort?.field;
    const sortOrder = sort?.order;

    const queryFilters: Record<string, any> = {};
    
    filters?.forEach((filter) => {
      if ("field" in filter) {
        const { field, operator, value } = filter;
        
    
        if (field === "title" && operator === "contains") {
          queryFilters.title_like = value;
        } else if (field === "propertyType" && operator === "eq") {
          queryFilters.propertyType = value;
        }else {
          queryFilters[field] = value;
        }
      }
    });

    const query = {
      _start: (current - 1) * pageSize,
      _end: current * pageSize,
      _sort: sortField,
      _order: sortOrder,
      ...queryFilters,
    };

    console.log("DataProvider sending query:", query);

    const { data, headers } = await axiosInstance.get(
      `${url}?${queryString.stringify(query)}`
    );

    const total = +(headers["x-total-count"] || 0) || data.length;

    return {
      data,
      total,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${API_URL}/${resource}/${id}`;
    const { data } = await axiosInstance.get(url);
    return { data };
  },

  create: async ({ resource, variables }) => {
    const url = `${API_URL}/${resource}`;
    const { data } = await axiosInstance.post(url, variables);
    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${API_URL}/${resource}/${id}`;
    const { data } = await axiosInstance.patch(url, variables);
    return { data };
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${API_URL}/${resource}/${id}`;
    const { data } = await axiosInstance.delete(url);
    return { data };
  },

  getApiUrl: () => API_URL,

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (sorters && sorters.length > 0) {
      const sort = sorters[0];
      requestUrl += `&_sort=${sort.field}&_order=${sort.order}`;
    }

    if (filters) {
      filters.forEach((filter) => {
        if ("field" in filter) {
          requestUrl += `&${filter.field}=${filter.value}`;
        }
      });
    }

    if (query) {
      requestUrl += `&${queryString.stringify(query)}`;
    }

    const { data } = await axiosInstance({
      url: requestUrl,
      method,
      data: payload,
      headers,
    });

    return { data };
  },
};

export const kyInstance = axiosInstance;