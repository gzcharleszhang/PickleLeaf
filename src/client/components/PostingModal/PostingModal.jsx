import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, FormControl, InputLabel, Input, FormHelperText, InputAdornment, Button,
} from '@material-ui/core';
import PostingModalContainer from 'client/containers/PostingModalContainer';
import PostingContainer from 'client/containers/PostingContainer';
import PostingTable from 'client/components/PostingTable/PostingTable';
import { isAuthenticated, getCurrentUser } from 'client/util/Auth';

import './PostingModal.scss';

class PostingModal extends React.Component {
  static propTypes = {
    book: PropTypes.object,
    postings: PropTypes.array,
    isPostingModalVisible: PropTypes.bool.isRequired,
    hidePostingModal: PropTypes.func.isRequired,
    createPosting: PropTypes.func.isRequired,
  }

  static defaultProps = {
    book: null,
    postings: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      amountErr: '',
      amount: '',
    };
  }

  handleClose = () => {
    const { hidePostingModal } = this.props;
    hidePostingModal();
  }

  handleFieldChange = (e, field) => {
    const { value } = e.target;
    const newState = {};
    if (field === 'amount') {
      const amount = Number.parseFloat(value);
      if (Number.isNaN(amount)) {
        newState.amountErr = 'Not a valid number';
      } else if (amount < 0 || amount > 10000) {
        newState.amountErr = 'Must be between 0 and 10000';
      } else {
        newState.amountErr = '';
      }
    }
    newState[field] = value;
    this.setState(newState);
  }

  handleCreatePosting = () => {
    const { amountErr, amount } = this.state;
    if (!amountErr && amount && isAuthenticated()) {
      const { book, createPosting } = this.props;
      const user = getCurrentUser();
      const newPosting = {
        userId: user.userId,
        bookId: book._id,
        price: amount,
      };
      createPosting(newPosting);
    }
  }

  render() {
    const { book, isPostingModalVisible, postings } = this.props;
    const { amountErr, amount } = this.state;
    if (!book) return null;
    return (
      <Dialog
        open={isPostingModalVisible}
        onClose={this.handleClose}
      >
        <div className="posting-modal-content">
          <div className="posting-modal-left">
            <FormControl
              error={!!amountErr}
              className="amount-input"
            >
              <InputLabel htmlFor="amount" required>
                  Amount
              </InputLabel>
              <Input
                id="amount"
                value={amount}
                onChange={e => this.handleFieldChange(e, 'amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
              <FormHelperText>{amountErr}</FormHelperText>
            </FormControl>
            <Button onClick={this.handleCreatePosting}>Add new posting</Button>
          </div>
          <div className="posting-modal-right">
            <PostingTable
              bookId={book._id}
              postings={postings}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default PostingContainer(PostingModalContainer(PostingModal));