import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import Axios from "axios";
import Select from "react-select";
import AsyncSelect from "react-select/async";
class Nova extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityRef: "",
      cityName: "",
      loadedWarehouses: [],
      isLoading: true,
      warSelectedItem: {value: "", label: ""}
    };
    this.setCity = this.setCity.bind(this);
    this.getWarhouses = this.getWarhouses.bind(this);
    this.changeWar = this.changeWar.bind(this);
  }

  getCities = async cityWord => {
    this.setState({ wasLoadedWar: false });
    return Axios.get(
      window.location.origin + "/api/Requests/GetCititesNova/" + cityWord
    ).then(responce => {
      let parsed = JSON.parse(responce.data);
      return parsed.data.map(item => {
        this.setState({isLoading: false})
        return { value: item.Ref, label: item.DescriptionRu };
      });
    });
  };

  setCity = itemCity => {
    this.getWarhouses(itemCity.value);
    this.setState({
      cityName: itemCity.label,
      cityRef: itemCity.value
    });
  };

  getWarhouses = cityRef => {
      this.setState({isLoading: true, loadedWarehouses: [], warSelectedItem: {value:"", label:""}});  
      Axios.get(
        window.location.origin + "/api/Requests/GetWarehousesNova/" + cityRef
      ).then(responce => {
        let parsed = JSON.parse(responce.data);
        let arr = parsed.data.map(item => {
          let obj = { value: item.Ref, label: item.DescriptionRu };
          return obj;
        });
        this.setState({ loadedWarehouses: arr, wasLoadedWar: true, isLoading: false });
      });
  };


  changeWar = (e) =>
  {
      this.setState({warSelectedItem: e});
  }

  render() {
    return (
      <div className="pay-info">
        {this.state.isLoading === true ? <img className="gif-loading" src={require("../../../images/loading.gif")} alt=""/> : ""}
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            defaultValue="option1"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            Самовывоз из Новой Почты
          </label>
        </div>
        <hr/>
        <div className="select-city">
        <label>Выберите город: </label>
          <AsyncSelect
            placeholder=""
            cacheOptions
            defaultOptions
            loadOptions={this.getCities}
            onChange={this.setCity}
          />
        </div>
        <br />
        <div></div>
        <br />
        <div style={{ maxWidth: "350px" }}>
          <label>Выберите отделение: </label>
          <Select
            isDisabled={!this.state.wasLoadedWar}
            options={this.state.loadedWarehouses}
            onChange={this.changeWar}
            value={this.state.warSelectedItem}
          />
        </div>
        <br />
        <div className="user-pay-info">
          <input
            className="form-control"
            placeholder="Номер телефона получателя"
          />
          <input className="form-control" placeholder="Ф.И.О получателя" />
        </div>
      </div>
    );
  }
}

export default Nova;
