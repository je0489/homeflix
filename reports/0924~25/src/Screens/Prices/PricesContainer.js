import React from "react";
import PricesPresenter from "./PricesPresenter";
import api from "../../api";

// 홈페이지 : 코인 명, 기호, 가격을 보여줍니다.
export default class extends React.Component {
  state = {
    homepage: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    try {
      const { data } = await api.homepage();
      this.setState({
        homepage: data
      });
    } catch {
      this.setState({ error: "Dont find price datas" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { homepage, loading, error } = this.state;
    return (
      <PricesPresenter homepage={homepage} loading={loading} error={error} />
    );
  }
}
