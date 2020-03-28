import React from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './flags-select.css';
import { Change_Lang, Translate } from 'utils/actions';
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class Localize extends React.Component {
  constructor(props) {
    super(props);

    this.state =
    {
      lang: props.lang,
      current_lang_path: props.lang != null || props.lang.length > 0 ? require('../../images/' + props.lang + '.svg') : require('../../images/US.svg'),
      display: false,
      supportLanguages: ["US", "UA", "RU"]
    }
  }

  UNSAFE_componentWillReceiveProps = async(nextProps) => {
    if (this.props !== nextProps) {
      this.setState({ current_lang_path: (require('../../images/' + nextProps.lang + '.svg')) });
      this.setState(nextProps);
    }
  }

  onChangeSelectedItem = (data_lang) => {
    console.log(data_lang);
    this.props.Change_Lang({ lang: data_lang.target.id });
  }

  render() {
    return (
      <NavDropdown
        eventKey={2}
        className="selector"
        title={<span className="selector-title"><img src={this.state.current_lang_path} className="selector-img" /><span>{this.state.lang}</span></span>}
        id="basic-nav-dropdown-right"
      >
        {this.state.supportLanguages.map(item => {
          let flag = require("../../images/" + item + ".svg");
          return (
            <MenuItem className="selector-item" onClick={this.onChangeSelectedItem} id={item}>
              <div id={item} >
                <img src={flag} id={item} className="selector-img" />
                <span id={item}>{item}</span>
              </div>
            </MenuItem>
          );
        })}
      </NavDropdown>
    );
  }

}

const mapStateProps = (state) => {
  return {
    lang: state.langReducer.lang
  };
}

export default connect(mapStateProps, { Change_Lang, Translate })(Localize);