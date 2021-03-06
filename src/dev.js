import {ReactBackdrop,ReactBackdropCtrl} from './main';
import './dev.scss';
class App extends React.Component{
  state={
    backVisible:false
  }

  componentWillMount(){
    this._backdrop = ReactBackdropCtrl.createInstance({
      onClick:function(){
        ReactBackdropCtrl.hide();
      }
    });
  }

  _click(name){
    ReactBackdropCtrl.show();
  }

  _click2(name){
    this.state.backVisible=true;
    this.setState(this.state);
  }

  _back2_click(){
    this.state.backVisible=false;
    this.setState(this.state);
  }

  render(){
    return (
      <div className="hello-backdrop">
        <button onClick={this._click.bind(this,'btn')}>ClickMe</button>
        <button onClick={this._click2.bind(this,'btn2')}>Inlinke Backdrop</button>
        <ReactBackdrop onClick={this._back2_click.bind(this)} visible={this.state.backVisible} />
      </div>
    );
  }
}

ReactDOM.render(
  <App cssClass="test-bg" />,
  document.getElementById('app')
);
