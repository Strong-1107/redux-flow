// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import usersReducer from '../reducers/usersSlice'
import userSkillsReducer from '../reducers/userSkillsSlice'
import userLoginReducer from '../reducers/userLoginSlice'
import postsReducer from '../reducers/postsSlice'
import skillsReducer from '../reducers/dbSkillsSlice'
import filtersReducer from '../reducers/filtersSlice'

import configureMockStore from 'redux-mock-store'

const reducers = combineReducers({ users: usersReducer, user: userLoginReducer, user_skills: userSkillsReducer, posts: postsReducer, skills: skillsReducer, visibilityFilters: filtersReducer })

const mockStore = configureStore({ reducer: reducers })

const mockStoreTwo = configureMockStore({ reducer: reducers })

function renderWithRedux (
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: reducers, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper ({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { renderWithRedux, mockStore, mockStoreTwo }
