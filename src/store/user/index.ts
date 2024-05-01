import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CurrentUser, GroupsData, MessageData } from '../../interfaces'
import { ROLES } from '../../enums';
interface UsersState {
  currentUser: CurrentUser;
  groups: GroupsData[];
  messages: MessageData[];
}

interface AdminUserState extends UsersState {
  users: CurrentUser[]
}
const initialState: AdminUserState = {
  currentUser: {
    username: "",
    email: "",
    role: ROLES.BASIC_USER,
    id: "",
    createdAt: new Date()
  },
  groups: [],
  messages: [],
  users: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload
    },
    updateGroups: (state, action: PayloadAction<GroupsData[]>) => {
      state.groups = action.payload
    },
    updateMessages: (state, action: PayloadAction<MessageData[]>) => {
      state.messages = action.payload
    },
    updateUsers: (state, action: PayloadAction<CurrentUser[]>) => {
      state.users = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { updateUser, updateGroups, updateMessages, updateUsers } = userSlice.actions

export default userSlice.reducer