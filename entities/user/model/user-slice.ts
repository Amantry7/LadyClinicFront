import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { userApi } from "../api/user-api"
import type { User, PaginationResponse } from "@/shared/types/api"

interface UserState {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  count: number
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  count: 0,
}

// Async Thunks
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await userApi.getUsers(limit, offset)
    return response
  },
)

export const fetchUserById = createAsyncThunk("user/fetchUserById", async (id: number) => {
  const response = await userApi.getUserById(id)
  return response
})

export const createUser = createAsyncThunk("user/createUser", async (userData: Omit<User, "id" | "patient_uid">) => {
  const response = await userApi.createUser(userData)
  return response
})

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userData }: { id: number; userData: Partial<User> }) => {
    const response = await userApi.updateUser(id, userData)
    return response
  },
)

export const deleteUser = createAsyncThunk("user/deleteUser", async (id: number) => {
  await userApi.deleteUser(id)
  return id // Return the ID of the deleted user
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<PaginationResponse<User>>) => {
        state.loading = false
        state.users = action.payload.results
        state.count = action.payload.count
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch users"
      })
      // fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch user"
      })
      // createUser
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.users.push(action.payload) // Add new user to the list
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create user"
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        const index = state.users.findIndex((user) => user.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to update user"
      })
      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false
        state.users = state.users.filter((user) => user.id !== action.payload)
        if (state.currentUser?.id === action.payload) {
          state.currentUser = null
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to delete user"
      })
  },
})

export const { clearCurrentUser } = userSlice.actions
export default userSlice.reducer
