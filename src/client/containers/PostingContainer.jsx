import { connect } from 'react-redux';
import { postingsSelector } from 'client/redux/selectors/postingSelectors';
import PostingActions from 'client/redux/actions/postingActions';

const mapStateToProps = state => ({
  postings: postingsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  createPosting: posting => dispatch(PostingActions.create(posting)),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
