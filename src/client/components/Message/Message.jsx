import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { MessageTypes } from 'common/constants';
import './Message.scss';

let showMessageFn = () => {};

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      type: MessageTypes.Info,
      action: null,
      isVisible: false,
      duration: 3000,
    };
  }

  componentDidMount() {
    showMessageFn = this.showMessage;
  }

  showMessage = (type, message, duration, action) => {
    this.setState({
      message,
      type,
      action,
      duration,
      isVisible: true,
    });
  }

  handleClose = () => {
    this.setState({ isVisible: false });
  }

  render() {
    const {
      message, type, action, isVisible, duration,
    } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        open={isVisible}
        autoHideDuration={duration}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={`snack-bar-content ${type}`}
          message={<span>{message}</span>}
          action={action}
        />
      </Snackbar>
    );
  }
}

export function showMessage(type, message = '', duration = 3000, action = null) {
  showMessageFn(type, message, duration, action);
}

export default Message;
