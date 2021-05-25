import React from 'react';
import { moviesApi, tvApi } from '../../api';
import DetailPresenter from './DetailPresenter';

export default class extends React.Component {

    constructor(props) {
        super(props);
        const {
            location: { pathname }
        } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }




    async componentDidMount() {
        const { match: {
            params: { id }
        },
            history: { push },
            location: { pathname }
        } = this.props;
        const { isMovie } = this.state
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push("/");
        }

        let result = null;

        try {
            if (isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parsedId))
                console.log(result)
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId))
                console.log(result);
            }
        } catch {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({ loading: false, result })
        }
        this.isMovie = pathname.includes("/movie/");
    }

    render() {
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter
                result={result}
                loading={loading}
                error={error}
            ></DetailPresenter>
        )
    }
}