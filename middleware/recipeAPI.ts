

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ingredient } from '../models/ingredient'
import { RecipeData } from '../models/recipeData'

// Define a service using a base URL and expected endpoints
export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getRecipeByUrl: builder.query<RecipeData, string>({
      query: (encodedUrl) => `recipe?url=${encodedUrl}`
    }),
    parseIngredients: builder.mutation<Ingredient[], string[]>({
      query: (ingredients) => ({
        url: `ingredients`,
        method: 'POST',
        body: { ingredients },
      }),
      transformResponse: (response: { ingredients: Ingredient[] }) => response.ingredients,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRecipeByUrlQuery, useParseIngredientsMutation } = recipeApi