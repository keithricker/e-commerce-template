const icons = require('@fortawesome/free-solid-svg-icons')
const { faCloudSunRain, faUserFriends, faPlay, faMarker, faChartLine } = icons;
const INITIAL_STATE = {
    sections: [
        {
          title: 'weather',
          imageUrl: '/weatherwidget.png',
          icon: faCloudSunRain,
          id: 1,
          linkUrl: 'shop/weather'
        },
        {
          title: 'social',
          imageUrl: '/kidshugging.png',
          icon: faUserFriends,
          id: 2,
          linkUrl: 'shop/social'
        },
        {
          title: 'music',
          imageUrl: '/musicwidget.png',
          icon: faPlay,
          id: 3,
          linkUrl: 'shop/music'
        },
        {
          title: 'finance',
          imageUrl: '/stockwidget.png',
          icon: faChartLine,
          id: 4,
          linkUrl: 'shop/finance',
          size: 'large'
        },
        {
          title: 'productivity',
          imageUrl: '/pic.png',
          icon: faMarker,
          id: 5,
          linkUrl: 'shop/productivity',
          size: 'large'
        }               
  ]    
}
const directoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
export default directoryReducer;