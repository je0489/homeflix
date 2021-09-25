import React from "react";
import ExchangesPresenter from "./ExchangesPresenter";
import api from "../../api";

// 거래소 : 거래소 이름, 설명 및 웹 사이트 링크를 표시합니다.
export default class extends React.Component {
  state = {
    exchanges: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    try {
      const { data } = await api.exchanges();
      this.setState({
        exchanges: data
      });
    } catch {
      this.setState({ error: "Dont find exchange datas" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { exchanges, loading, error } = this.state;
    return (
      <ExchangesPresenter
        exchanges={exchanges}
        loading={loading}
        error={error}
      />
    );
  }
}
