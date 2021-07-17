const icons = require('@fortawesome/free-solid-svg-icons')
const { faCloudSunRain, faUserFriends, faPlay, faMarker, faChartLine } = icons;
const INITIAL_STATE = {
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
}
const directoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
export default directoryReducer;