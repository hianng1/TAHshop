import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: newCategory,
            }),

        }),
        updateCategory: builder.mutation({
            query: ({categoryID, updatedCategory}) => ({
                url: `${CATEGORY_URL}/${categoryID}`,
                method:"PUT",
                body: updatedCategory,
            })
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE",
            })
        }),
        fetchCategories: builder.query({
            // Đổi fetchCategory thành query
            query: () => `${CATEGORY_URL}/categories`,
          }),
    })
});

export const {useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} = categoryApiSlice