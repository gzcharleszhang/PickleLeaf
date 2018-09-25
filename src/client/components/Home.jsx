import React from 'react';
import BookList from 'client/components/BookList/BookList';
import NewBook from 'client/components/NewBook/NewBook';
import TopBar from 'client/components/TopBar/TopBar';

import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    };
  }

  handleSearchChange = (e) => {
    const { value } = e.target;
    const searchString = value.trim().toLowerCase();
    this.setState({ searchString });
  }

  render() {
    return (
      <div>
        <TopBar
          handleSearchChange={this.handleSearchChange}
        />
        <div className="home-root">
          <BookList searchString={this.state.searchString} />
          <div className="home-side">
            <NewBook />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
