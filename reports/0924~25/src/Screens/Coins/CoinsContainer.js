import React from "react";
import CoinsPresenter from "./CoinsPresenter";
import api from "../../api";

// 코인: 코인을 나열하고 순위별로 정렬합니다.
export default class extends React.Component {
  state = {
    coins: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    try {
      const { data } = await api.coins();
      this.setState({
        coins: data
      });
    } catch {
      this.setState({ error: "Dont find coin datas" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { coins, loading, error } = this.state;
    return <CoinsPresenter coins={coins} loading={loading} error={error} />;
  }
}
