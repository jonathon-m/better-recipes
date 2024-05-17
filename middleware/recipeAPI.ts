

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Recipe } from '../models/recipe'

// Define a service using a base URL and expected endpoints
export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/recipe' }),
  endpoints: (builder) => ({
    getRecipeByUrl: builder.query<Recipe, string>({
      query: (encodedUrl) => `?url=${encodedUrl}`
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRecipeByUrlQuery } = recipeApi