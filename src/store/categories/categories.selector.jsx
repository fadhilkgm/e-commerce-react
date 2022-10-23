import { createSelector } from 'reselect';

const selectCategoryReducer = (state) =>  state.categories;



export const selectCategories = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.categories
);

//running only when the selectCategories changes

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
  categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);
 