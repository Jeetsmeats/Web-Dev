/* IMPORT ITEMS */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({          // api for making calls to the backend

    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers"],      // represent the state of particular data
    endpoints: (build) => ({        // identify relevant api calls
        getUser: build.query({          /* GET USER HOOK */
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({     /* GET PRODUCTS HOOK */
            query: () => "clients/products",
            providesTags: ["Products"]
        }),
        getCustomers: build.query({   /* GET CUSTOMERS HOOK */
            query: () => "clients/customers",
            providesTags: ["Customers"]
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
} = api;
