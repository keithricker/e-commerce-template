import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../../firebase/firebase.utils'
import { signOutFailure } from '../../../redux/user/user.actions'

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
      const userSnapshot = userRef.get();
      const success = {id: userSnapshot.id, ...userSnapshot.data()};
      return success
  } catch(error) {
      return error
  }
}


async function isUserAuthenticated() {
  try {
      const userAuth = await getCurrentUser();
      if (!userAuth) return { currentUser:null, error:null }
      const snapShot = await getSnapshotFromUserAuth(userAuth)
      return signInSuccess(snapShot)
  } catch(error) {
      return failedAttempt(error)
  }
}

async function signInAfterSignUp(user,additionalData) {
  const snapShot = await getSnapshotFromUserAuth(user, additionalData);
  return snapShot
}

const asyncFunctions = {
  async checkUserSession() {
    const checked = await isUserAuthenticated()
    return checked
  },
  async signUp(email,password,displayName) {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName })
      const snapShot = await signInAfterSignUp(user,displayName)
      return signUpSuccess(snapShot)
    } catch(error) {
      return failedAttempt(error)
    }    
  },
  async googleSignIn() {
    try {
      const {user} = await auth.signInWithPopup(googleProvider);
      await getSnapshotFromUserAuth(user);
    } catch(error) {
      return failedAttempt(error);
    }    
  },
  async emailSignIn(email, password) {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email,password);
      const snapShot = await getSnapshotFromUserAuth(user);
      return signInSuccess(snapShot)
    } catch(error) {
      return failedAttempt(error)
    }
  },
  async signOut() {
    try {
      await auth.signOut();
      return signOutSuccess()
    } catch(error) {
      return signOutFailure(error)
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
      Object.assign(action.payload,state)
      state.isPending = false
    })
    builder.addCase(thunks[key].rejected, (state, action) => {
      Object.assign(action.error,state)
      state.isPending = false
    })
  })
}

const slice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    error:null,
    isPending:false
  },
  reducers: {},
  extraReducers
})

export const userReducer = slice.reducer
export const userActions = slice.actions
export const userThunks = thunks