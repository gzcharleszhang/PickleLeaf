import React from 'react';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line
  Paper, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination,
} from '@material-ui/core';

import './PostingTable.scss';

class PostingTable extends React.Component {
  static propTypes = {
    postings: PropTypes.array,
    postingsPerPage: PropTypes.number,
  }

  static defaultProps = {
    postings: [],
    postingsPerPage: 10,
  }

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };
  }

  handleChangePage = (e, page) => {
    this.setState({ page });
  }

  render() {
    const { postings, postingsPerPage } = this.props;
    const { page } = this.state;
    if (!postings || postings.length === 0) return null;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seller</TableCell>
              <TableCell numeric>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postings.map(posting => (
              <TableRow key={posting._id}>
                <TableCell>{posting.user.name}</TableCell>
                <TableCell numeric>{posting.price}</TableCell>
                <TableCell>{posting.buyerId ? 'Sold' : 'Available'}</TableCell>
                <TableCell>Coming Soon!</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={postings.length}
                rowsPerPage={postingsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

export default PostingTable;