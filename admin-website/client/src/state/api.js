/* IMPORT ITEMS */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({          // api for making calls to the backend

    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User"],      // represent the state of particular data
    endpoints: (build) => ({        // identify relevant api calls
        getUser: build.query({
            query: (id) => `/general/users/${id}`,
            providesTags: ["User"]
        })
    })
})

export const {
    useGetUserQuery,
} = api;
