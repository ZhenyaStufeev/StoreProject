import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
class Paginate extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handlePageClick(e) {
    window.location.hash = e.selected+1;
    // console.log(window.location);
    // alert(window.location.hash.slice(1));
  }

  render() {
    return (
      <div className="react-paginate">
        <ReactPaginate
          pageCount={this.props.totalPages}
          marginPagesDisplayed={1}
          previousLabel="<"
          nextLabel=">"
          onPageChange={this.handlePageClick}
        />
      </div>
    );
  }
}

// export default Paginate;
const mapStateProps = (state) => {
  console.log(state);
  return {
    totalPages: state.productReducer.totalPages
  };
}

export default connect(mapStateProps,{  })(Paginate);