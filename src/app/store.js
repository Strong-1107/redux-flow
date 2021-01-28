import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import likesReducer from '../features/likes/likesSlice'
import commentsReducer from '../features/comments/commentsSlice';
import experiencesReducer from '../features/experiences/experiencesSlice';
import userLoginReducer from '../features/login/userLoginSlice';


export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    likes: likesReducer,
    user: userLoginReducer,
    comments: commentsReducer,
    experiences: experiencesReducer

  },
})
