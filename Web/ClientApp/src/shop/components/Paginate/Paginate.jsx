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
  }

  render() {
    var current = this.props.currentPage-1;
    return (
      <div className="react-paginate">
        <ReactPaginate
          pageCount={this.props.totalPages}
          marginPagesDisplayed={1}
          previousLabel="<"
          nextLabel=">"
          onPageChange={this.handlePageClick}
          forcePage={current}
        />
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    totalPages: state.productReducer.totalPages,
    currentPage: state.productReducer.page
  };
}

export default connect(mapStateProps,{  })(Paginate);