import axios from 'axios'

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "57e3e7beeb6464d751af6b324f615585",
        language: "ko",
        region: "KR"
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) => api.get(`movie/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get('search/movie', {
        params: {
            query: term
        }
    }),
    nowPlayingVideos: async () => {
        let videoObjList = [];
        let videoList = [];
        let temp;

        const { data } = await api.get("movie/now_playing")
        await Promise.all(
            data.results.map(async (item) => {
                videoObjList.push(await api.get(`movie/${item.id}/videos`))
                temp = await api.get(`movie/${item.id}/videos`);
                temp.data.results && temp.data.results.length > 0 && videoList.push(temp.data.results[0].key);
            })
        )
        videoList.sort(() => Math.random() - 0.5)

        return videoList;
    }
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: (id) => api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get('search/tv', {
        params: {
            query: term
        }
    })
}


export default api;