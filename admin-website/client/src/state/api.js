/* IMPORT ITEMS */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({          // api for making calls to the backend

    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User",
        "Products",
        "Customers",
        "Transactions",
        "Geography",
        "Sales",
        "Admins",
        "Performance",
        "Dashboard",
    ],      // represent the state of particular data

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
        }),
        getTransactions: build.query({  /* GET TRANSACTIONS HOOK */
            query: ({ page, pageSize, sort, search }) => ({
                url: "clients/transactions",
                method: "GET",
                params: { page, pageSize, sort, search }
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query({      /* GET GEOGRAPHY HOOK */
            query: () => "clients/geography",
            providesTags: ["Geography"]
        }),
        getSales: build.query({         /* GET SALES HOOK */
            query: () => "sales/sales",
            providesTags: ["Sales"]
        }),
        getAdmins: build.query({       /* GET ADMINS HOOK */
            query: () => "management/admins",
            providesTags: ["Admins"]
        }),
        getUserPerformance: build.query({       /* GET USER PERFORMANCE HOOK */
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({             /* GET DASHBOARD INFO HOOK */
            query: () => `general/dashboard`,
            providesTags: ["Dashboard"],
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
} = api;
