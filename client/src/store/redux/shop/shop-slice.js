import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firestore, convertSnapshot } from '../../../firebase/firebase.utils'
import { faCloudSunRain, faUserFriends, faPlay, faMarker, faChartLine } from '@fortawesome/free-solid-svg-icons'

async function _fetchCollections() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = await collectionRef.get();
    const collectionsMap = await convertSnapshot(snapshot);
    return collectionsMap
  } catch (error) {
    return error
  }      
}

export const shopThunks = {
  fetchCollections: createAsyncThunk('shop/fetchCollections',_fetchCollections)
}

const slice = createSlice({
  name:'shop',
  initialState: {
    collections: null,
    isPending: false,
    sections: [
      {
        title: 'weather',
        imageUrl: '/img/weatherwidget.webp',
        icon: faCloudSunRain,
        id: 1,
        linkUrl: 'shop/weather'
      },
      {
        title: 'social',
        imageUrl: '/img/kidshugging.webp',
        icon: faUserFriends,
        id: 2,
        linkUrl: 'shop/social'
      },
      {
        title: 'music',
        imageUrl: '/img/musicwidget.webp',
        icon: faPlay,
        id: 3,
        linkUrl: 'shop/music'
      },
      {
        title: 'finance',
        imageUrl: '/img/stockwidget.webp',
        icon: faChartLine,
        id: 4,
        linkUrl: 'shop/finance',
        size: 'large'
      },
      {
        title: 'productivity',
        imageUrl: '/img/pic.webp',
        icon: faMarker,
        id: 5,
        linkUrl: 'shop/productivity',
        size: 'large'
      }               
    ]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shopThunks.fetchCollections.pending, (state) => {
      state.isPending = true
    })
    builder.addCase(shopThunks.fetchCollections.fulfilled, (state, action) => {
      state.isPending = false
      state.error = null
      state.collections = action.payload
    })
    builder.addCase(shopThunks.fetchCollections.rejected, (state, action) => {
      state.collections = null
      state.isPending = false
      state.error = action.error.message
    })
  }
})

export const shopReducer = slice.reducer
export const shopActions = slice.actions