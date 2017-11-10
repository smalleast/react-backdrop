import './style.scss';
import documentAppend from 'react-document-append';
import noop from 'noop';

class Backdrop extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    onHidden: PropTypes.func,
    onShown: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    className: '',
    style: {},
    onHidden: noop,
    onShown: noop,
    onClick: noop
  };

  static newInstance(inProps) {
    return documentAppend(Backdrop, inProps, {
      className: 'backdrop-wrapper'
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      animating: false
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState(nextProps)
  }

  show() {
    if (!this.state.visible) {
      this._setVisible(true, this.props.onShown);
    }
  }

  hide() {
    if (this.state.visible) {
      this._setVisible(false, this.props.onHidden);
    }
  }

  _setVisible(inValue, inCallback) {
    var self = this;
    this.setState({
      animating: true
    }, () => {
      this.setState({
        visible: inValue
      }, () => {
        inCallback(self.state);
      });
    });
  }

  _onTransitionEnd() {
    this.setState({
      animating: false
    });
  }

  //hidden: 没有动画，visible= false;
  //无hidden: visible:true

  render() {
    return (
      <div
        style={this.props.style}
        hidden={!this.state.visible && !this.state.animating}
        data-visible={this.state.visible}
        onClick={this.props.onClick}
        onTransitionEnd={this._onTransitionEnd.bind(this)}
        className={classNames('react-backdrop', this.props.className)}></div>
    );
  }
}

export default Backdrop;
