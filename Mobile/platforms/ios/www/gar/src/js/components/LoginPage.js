var React = require('react');
var LoginForm  = require('grommet/components/LoginForm');

var LoginPage = React.createClass({
  render: function () {
    return (
      <LoginForm
        logo={<Logo />}
        title="Get A Ride"
        secondaryText=""
        rememberMe={true}
        forgotPassword={<a>#</a>}
        
        errors={["Invalid username or password."]}
      />
    );
  }
});

module.exports = LoginPage;
