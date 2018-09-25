import { connect } from 'react-redux';
import { bookPostingsSelector } from 'client/redux/selectors/postingSelectors';
import PostingActions from 'client/redux/actions/postingActions';

const mapStateToProps = (state, props) => ({
  postings: bookPostingsSelector(state, props),
});

const mapDispatchToProps = dispatch => ({
  createPosting: posting => dispatch(PostingActions.create(posting)),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
