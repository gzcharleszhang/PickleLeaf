import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
} from '@material-ui/core';
import PostingModalContainer from 'client/containers/PostingModalContainer';

import './PostingModal.scss';

class PostingModal extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    isPostingModalVisible: PropTypes.bool.isRequired,
    hidePostingModal: PropTypes.func.isRequired,
  }

  handleClose = () => {
    const { hidePostingModal } = this.props;
    hidePostingModal();
  }

  render() {
    const { book, isPostingModalVisible } = this.props;
    return (
      <Dialog
        open={isPostingModalVisible}
        onClose={this.handleClose}
      >
        <div>{book.title}</div>
      </Dialog>
    );
  }
}

export default PostingModalContainer(PostingModal);