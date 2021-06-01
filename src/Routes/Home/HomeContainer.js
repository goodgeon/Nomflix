import React from 'react';
import { moviesApi } from '../../api';
import HomePresenter from './HomePresenter';

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true,
        nowPlayingVideos: [],
        mute: '1'
    };

    async componentDidMount() {
        try {
            const { data: { results: nowPlaying }
            } = await moviesApi.nowPlaying();

            const { data: { results: upcoming } } = await moviesApi.upcoming();
            const { data: { results: popular } } = await moviesApi.popular();
            const nowPlayingVideos = await moviesApi.nowPlayingVideos();

            this.setState({
                nowPlaying,
                upcoming,
                popular,
                nowPlayingVideos,
            })

        } catch {
            this.setState({
                error: "Can't find movies information"
            })
        } finally {
            this.setState({
                loading: false //뭐가 발생하든 끝에는 로딩 false
            })
        }
    }

    onClick = () => {
        if (this.state.mute === '1') {
            this.setState({
                mute: '0'
            })
        } else {
            this.setState({
                mute: '1'
            })
        }
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading, nowPlayingVideos, mute } = this.state;
        console.log(this.state)
        return (
            <HomePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
                nowPlayingVideos={nowPlayingVideos}
                mute={mute}
                onClick={this.onClick}
            ></HomePresenter>
        )
    }

}