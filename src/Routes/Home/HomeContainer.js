import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state = {
    bgImgOfPopular: null,
    error: null,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({
        bgImgOfPopular: popular.slice(0, 4).map((movie) => movie.backdrop_path),
      });
    } catch {
      this.setState({
        error: "Can't find the infomation.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { bgImgOfPopular, error } = this.state;
    return <HomePresenter bgImgOfPopular={bgImgOfPopular} error={error} />;
  }
}
