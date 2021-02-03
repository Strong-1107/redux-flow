
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'http://localhost:8080/api/posts_skills'

const postsSkillsAdapter = createEntityAdapter({
	selectId: (postSkill) => postSkill.id
})

const initialState = postsSkillsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPostSkills = createAsyncThunk('postSkills/fetchPostSkills', async () => {
  const response = await axios.get(url);
  // console.log("response in post skill thunk: ", response.data);
  return response.data
})

// export const addNewPostSkill = createAsyncThunk(
//   'postsSkills/addNewPostSkill',
//   async (initialPostSkills) => {
//     const {name} = initialPostSkills
//     const response = await axios.post(url, {name});
//     return response.data
//   }
// )

export const addPostSkills = createAsyncThunk(
  'postSkills/addPostSkills',
  async (initialPostSkills) => {
    const {post_id, db_skills_id} = initialPostSkills
    const response = await axios.post(url, {post_id, db_skills_id});
    return response.data
  }
)


export const removePostSkill = createAsyncThunk(
  'postSkills/removePostSkill',
  async (initialPostSkills) => {
    const { post_id, skill_id} = initialPostSkills
    const removePostSkill = {
      post_id: post_id,
      skill_id: skill_id,
    };
    const response = await axios.delete(url, { 
      params: { 
        removePostSkill
      }
    });
    return response.post
  }
)

const postsSkillsSlice = createSlice({
  name: 'postSkills',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchPostSkills.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPostSkills.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      postsSkillsAdapter.upsertMany(state, action.payload)
    },
    [fetchPostSkills.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addPostSkills.fulfilled]: (state, action) => {
      postsSkillsAdapter.upsertOne(state, action.payload)
    },
    [removePostSkill.fulfilled]: (state, action) => {
      postsSkillsAdapter.removeOne(state, action.payload)
    } 
  },
})

export const { postsSkillAdded } = postsSkillsSlice.actions

export default postsSkillsSlice.reducer

export const {
  selectAll: selectAllPostSkills,
  selectById: selectPostSkillById,
  selectIds: selectPostSkillIds,
} = postsSkillsAdapter.getSelectors((state) => state.postSkills)

export const selectPostSkillsByPostId = createSelector(
  [selectAllPostSkills, (state, postsId) => postsId],
  (postsSkills, postId) => postsSkills.filter((postsSkill) => postsSkill.post_id === postId )
)