import React, { Component, PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Movies.css';

const cx = classNames.bind(s);

class Description extends Component {

  static propTypes = {
    description: PropTypes.string.isRequired,
  };

  state = {
    collapsed: true,
  };

  componentWillReceiveProps() {
    this.setState({ collapsed: true });
  }

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    let descriptionClass = cx({
      movieDescription: true,
      collapsed: this.state.collapsed,
    });
    let collapseClass = cx({
      readMore: true,
      hidden: this.props.description.length < 292,
    });
    let linkText = this.state.collapsed ? 'More' : 'Less';

    return (
      <Well bsSize="large">
        <p className={descriptionClass}>{this.props.description}</p>
        <a
          href="javascript:void(0)"
          className={collapseClass}
          onClick={this.handleClick}
        >{linkText}
        </a>
      </Well>
    );
  }

}

export default withStyles(s)(Description);
