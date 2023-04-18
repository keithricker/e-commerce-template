import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDocuments } from '../../../firebase/firebase.utils'
import * as icons from '@fortawesome/free-solid-svg-icons'

const { faCloudSunRain, faUserFriends, faPlay, faMarker, faChartLine } = icons

const asyncFunctions = {
  async fetchCollections() {
    const collections = await fetchDocuments('categories')
    Object.values(collections).forEach(collection => {
      collection.routeName = encodeURI(collection.title.toLowerCase())
    })
    return { collections }
  },
  async fetchSections() {
    const result = await fetchDocuments('sections')
    // set the icon from font awesome by name, then sort by their "order" field
    const sections = Object.values(result).map(value => { 
      value.icon = icons[value.icon]
      return value
    }).sort((a,b) => a.order - b.order)
    return { sections }
  }
}

const thunks = {}
Object.keys(asyncFunctions).forEach(key => {
  thunks[key] = createAsyncThunk(
    'shop/'+key,asyncFunctions[key]
  )
})

export const shopThunks = thunks

const extraReducers = (builder) => {
  Object.keys(asyncFunctions).forEach(key => {
    builder.addCase(thunks[key].pending, (state) => {
      state.isPending = true
    })
    builder.addCase(thunks[key].fulfilled, (state, action) => {
      Object.assign(state,action.payload)
      state.isPending = false
      state.error = false
    })
    builder.addCase(thunks[key].rejected, (state, action) => {
      console.error('fetching rejcted',action.error.message)
      state.error = action.error.message
      state.isPending = false
    })
  })
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
  extraReducers
})

export const shopReducer = slice.reducer
export const shopActions = slice.actions