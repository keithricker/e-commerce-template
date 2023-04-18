import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../../firebase/firebase.utils'

function signInSuccess(user) {
  return {
    currentUser: user,
    error: null,
    isPending: false
  }
}
function signUpSuccess({user, additionalData}) {
  return {
    ...user,
    ...additionalData
  }
}
async function signOutSuccess(signOut={}) {
  return {
    ...signOut,
    currentUser: null,
    error: null               
  }
}

async function failedAttempt(msg) {
  return {
    currentUser:null,
    error: msg,
  }
}

async function getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
      const userRef = await createUserProfileDocument(userAuth, additionalData);
      if (userRef.error) {
        throw new Error(userRef.error || "User doesn't exist.")
      }
      const userSnapshot = await userRef.get();
      const success = {id: userSnapshot.id, ...userSnapshot.data()};
      return success
  } catch(error) {
      return error
  }
}

async function isUserAuthenticated() {
  try {
      const userAuth = await getCurrentUser();
      if (typeof userAuth !== 'object') return { isAuthenticated:false }
      const snapShot = await getSnapshotFromUserAuth(userAuth)
      if (snapShot instanceof Error) {
        return { isAuthenticated:false, error:snapShot.message }
      }
      return { isAuthenticated: true, user: snapShot }
  } catch(error) {
      return { isAuthenticated:false, error:error.message }
  }
}

async function signInAfterSignUp(user,additionalData) {
  const snapShot = await getSnapshotFromUserAuth(user, additionalData);
  return snapShot
}

const asyncFunctions = {
  async checkUserSession() {
    const checked = await isUserAuthenticated()
    if (checked.error) {
      throw new Error(checked.error)
    }
    if (!checked.isAuthenticated) {
      return { currentUser: null, error:null }
    }
    return { currentUser: checked.user, error:null }
  },
  async signUp({email,password,displayName}) {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      const _document = await createUserProfileDocument(user, { displayName })
      if (_document.error) {
        return failedAttempt(_document.error)
      }
      const snapShot = await signInAfterSignUp(user,displayName)
      return signUpSuccess(snapShot)
    } catch(error) {
      return failedAttempt(error.message)
    }    
  },
  async googleSignIn() {
    try {
      const {user} = await auth.signInWithPopup(googleProvider);
      await getSnapshotFromUserAuth(user);
    } catch(error) {
      return failedAttempt(error.message);
    }    
  },
  async emailSignIn(email, password) {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email,password);
      const snapShot = await getSnapshotFromUserAuth(user);
      return signInSuccess(snapShot)
    } catch(error) {
      return failedAttempt(error.message)
    }
  },
  async signOut() {
    try {
      await auth.signOut();
      return signOutSuccess()
    } catch(error) {
      return failedAttempt(error.message)
    }
  }
}

const thunks = {}
Object.keys(asyncFunctions).forEach(key => {
  thunks[key] = createAsyncThunk(
    'user/'+key,asyncFunctions[key]
  )
})
const extraReducers = (builder) => {
  Object.keys(asyncFunctions).forEach(key => {
    builder.addCase(thunks[key].pending, (state) => {
      state.isPending = true
    })
    builder.addCase(thunks[key].fulfilled, (state, action) => {
      Object.assign(state,action.payload)
      state.isPending = false
    })
    builder.addCase(thunks[key].rejected, (state, action) => {
      state.error = action.error.message
      state.isPending = false
    })
  })
}

const initialState = {
  currentUser: null,
  error:null,
  isPending:false
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset() {
      return { ...initialState }
    }
  },
  extraReducers
})

export const userReducer = slice.reducer
export const userActions = slice.actions
export const userThunks = thunks