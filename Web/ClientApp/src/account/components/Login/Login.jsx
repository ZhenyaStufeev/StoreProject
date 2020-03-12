import React from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
// import './style.css';
import { Link } from "react-router-dom";
// import { login, LogModal } from '../methods/actions';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ISLOG, ISREG } from "store/types";
import { openAuth } from "utils/storecontrol";
Modal.setAppElement("#root");

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.OnChange = this.OnChange.bind(this);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      isLoading: false,
      errors: [],
      confirmisvalid: true
    };
  }

  changeModal = e => {
    this.props.openAuth(true, this.props.TypeAuth === ISLOG ? ISREG : ISLOG);
  };

  closeModal = e => {
    this.props.openAuth(false);
    this.setState({
        email: "",
        password: "",
        confirmpassword: "",
        isLoading: false,
        errors: [],
        confirmisvalid: true
    });
  };

  SendLoginForm = e => {
    e.preventDefault();
    let formIsValid = true;

    if (formIsValid === false) {
      this.updateAnimation({ element_id: "input-form", timeout: 750 });
    }
  };

  OnChange = element => {
    let Value = element.target.value;
    switch (element.target.id) {
      case "email": {
        this.setState({ email: Value });
        break;
      }
      case "password": {
        this.setState({ password: Value });
        break;
      }
      case "confirmpassword": {
        let isValid = false;
        if(Value === this.state.password)
            isValid = true;
        this.setState({ confirmpassword: Value, confirmisvalid: isValid });
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    let content = (
      <div>
        <Modal
          center={true}
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="shadow modal-window fading"
        >
          <div className="modal-header">
            <div className="modal-auth-info">
              <h5>
                <div>
                  <span style={{ textDecoration: "underline" }}>
                    {this.props.TypeAuth === ISLOG
                      ? "Авторизация"
                      : "Регистрация"}
                  </span>
                  <span> | </span>
                  <span onClick={this.changeModal} className="de-link">
                    {this.props.TypeAuth === ISREG
                      ? "Авторизация"
                      : "Регистрация"}
                  </span>
                </div>
              </h5>

              <span
                style={{
                  marginLeft: "5px",
                  color: "#dc3545",
                  display: "inline-block"
                }}
                className="text-danger container"
              >
                <ul>
                  <li>Указаный логин/пароль являются неверными.</li>
                </ul>
              </span>
            </div>

            <button
              type="button"
              className="close close-auth"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.closeModal}
            ></button>
          </div>
          <div className="modal-body-footer">
            <div className="modal-body container">
              <div
                className="auth-body-inputs"
                id="input-form"
                style={{ transition: "3s" }}
              >
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  onChange={this.OnChange}
                  placeholder="Почта"
                />
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={this.OnChange}
                  placeholder="Пароль"
                />
                {this.props.TypeAuth === ISREG ? (<div>
                <input
                  type="password"
                  id="confirmpassword"
                  className={classnames("form-control", this.state.confirmisvalid === false ? "is-invalid" : "")}
                  onChange={this.OnChange}
                  placeholder="Подтверждение пароля"
                />

                {this.state.confirmisvalid === false ? (
                  <div className="invalid-feedback">
                    Указаные пароли не совпадают
                  </div>
                ) : ""}
                </div>) : ""}
              </div>

              <div className="auth-after-body-inputs">
                <div className="auth-after-body-inputs auth-modal-buttons">
                  <Link
                    to="/"
                    className="button auth-modal-button auth-button-type-login"
                    onClick={this.SendLoginForm}
                    href="#"
                  >
                   {this.props.TypeAuth === ISLOG
                      ? "Вход"
                      : "Регистрация"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="modal-footer line">
              <div className="auth-modal-buttons">
                <Link
                  id="google"
                  className="button auth-modal-button auth-button-type-google"
                  to="/"
                >
                  <div>
                    <i className="auth-modal-icon auth-button-type-google">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="-1 -1 32 32"
                        fill="none"
                        x="880"
                        y="755"
                      >
                        <path d="M0 0h30v30H0V0z" fill="#fff" />
                        <path
                          d="M27.903 15.3c0-.934-.084-1.83-.24-2.694h-12.4v5.095h7.086a6.058 6.058 0 0 1-2.627 3.973v3.305h4.255c2.491-2.294 3.926-5.67 3.926-9.678z"
                          fill="#3E82F1"
                        />
                        <path
                          d="M15.263 28.168c3.555 0 6.536-1.18 8.714-3.19l-4.255-3.305c-1.179.79-2.687 1.257-4.459 1.257-3.43 0-6.333-2.317-7.367-5.428H3.497v3.41c2.167 4.305 6.619 7.256 11.766 7.256z"
                          fill="#32A753"
                        />
                        <path
                          d="M7.896 17.503A7.925 7.925 0 0 1 7.484 15c0-.868.149-1.712.413-2.502v-3.41h-4.4A13.164 13.164 0 0 0 2.097 15c0 2.124.509 4.136 1.401 5.912l4.398-3.41z"
                          fill="#F9BB00"
                        />
                        <path
                          d="M15.263 7.07c1.934 0 3.669.665 5.033 1.97l3.777-3.777c-2.281-2.124-5.262-3.428-8.81-3.428-5.148 0-9.599 2.95-11.766 7.253L7.896 12.5c1.035-3.114 3.938-5.43 7.367-5.43z"
                          fill="#E74133"
                        />
                      </svg>
                    </i>
                    <div className="button-text">Google</div>
                  </div>
                </Link>

                <Link
                  id="facebook"
                  className="button auth-modal-button auth-button-type-facebook"
                  to="/"
                >
                  <div>
                    <i className="auth-modal-icon auth-button-type-facebook">
                      <svg
                        width="37"
                        height="33"
                        viewBox="-1 -1 37 33"
                        fill="none"
                        x="383"
                        y="761"
                      >
                        <path fill="#000" d="M0 0h35v31H0z" />
                        <path
                          d="M33.068 31C34.135 31 35 30.235 35 29.29V1.71C35 .765 34.135 0 33.068 0H1.932C.865 0 0 .765 0 1.71v27.58C0 30.235.865 31 1.932 31h31.136z"
                          fill="#fff"
                        />
                        <path
                          d="M19.101 25.843v-9.436h3.167l.474-3.677h-3.641v-2.348c0-1.065.296-1.79 1.822-1.79h1.947v-3.29c-.337-.045-1.493-.145-2.837-.145-2.807 0-4.729 1.714-4.729 4.86v2.712h-3.175v3.677h3.175v9.436h3.797z"
                          fill="#23599B"
                        />
                      </svg>
                    </i>
                    <div className="button-text">Facebook</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
    return content;
  }
}

const mapStateProps = state => {
  return {
    isOpen: state.elementsReducer.authIsOpen,
    TypeAuth: state.elementsReducer.typeAuth
  };
};

export default connect(mapStateProps, { openAuth })(LoginModal);
