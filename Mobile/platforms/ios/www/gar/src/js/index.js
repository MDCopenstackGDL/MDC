require('../scss/index.scss');

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Title = require('grommet/components/Title');
var LoginForm  = require('grommet/components/LoginForm');
var Anchor  = require('grommet/components/Anchor');
//var LoginPage = require('./components/LoginPage');

var Main = React.createClass({
  render: function() {
    return (
      <App centered={false}>
        <Header direction="column" align="center" large={true} pad={{horizontal: 'medium'}}>
          <img src="../img/logo.png"/>
          <Title>Get A Ride </Title>
        </Header>
        <LoginForm
          
          onSubmit={[""]}
        />
        <Anchor href="" target="_blank" align="center" onClick={""}>Sign up</Anchor>
        <Anchor href="" primary={true} align="center" onClick={""}>Forgot your password?</Anchor>
        
        <Footer appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>Build your ideas with <a href="http://grommet.io" target="_blank">Grommet</a>!</p>
        </Footer>
      </App>
    );
  }
});

var element = document.getElementById('content');
React.render(React.createElement(Main), element);

document.body.classList.remove('loading');
