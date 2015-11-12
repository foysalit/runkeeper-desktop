import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stats from '../components/Stats';
import * as StatsActions from '../actions/stats';

function mapStateToProps(state) {
  return {
    stats: state.stats
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(StatsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
