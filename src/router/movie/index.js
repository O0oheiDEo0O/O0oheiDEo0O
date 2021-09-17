export default {
  path : '/movie',
  component : () => import('@/views/Movie'),
  children : [
    {
      path : 'nowplaying',
      component : () => import('@/components/Movie/NowPlaying')
    },
    {
      path : 'city',
      component : () => import('@/components/Movie/City')
    },
    {
      path : 'comingsoon',
      component : () => import('@/components/Movie/ComingSoon')
    },
    {
      path : 'search',
      component : () => import('@/components/Movie/Search')
    },

    {
      path : 'detail/1/:movieId',
      components : {
        detail : ()=> import('@/views/Movie/detail')
      },
      props : {
        detail : true
      }
    },
    {
      path : 'detail/2/:movieId',
      components : {
        detail : ()=> import('@/views/Movie/detail')
      },
      props : {
        detail : true
      }
    },
    
    {
      path : '/movie',
      redirect : '/movie/nowplaying'
    }
  ]
}
