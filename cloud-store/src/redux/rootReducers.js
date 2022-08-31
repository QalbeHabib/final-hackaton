import { combineReducers } from 'redux'

import  {user} from './reducers/userReducer'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  users: user,
})

export default rootReducer
