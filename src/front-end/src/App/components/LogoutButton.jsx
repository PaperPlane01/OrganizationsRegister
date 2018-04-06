import React from 'react';
import {Button} from 'material-ui';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {doLogout} from "../actions/user-actions";

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Button variant={'raised'}
                       color={'primary'}
                       onClick={this.props.handleLogoutRequest}>
            Выйти
        </Button>
    }
}

LogoutButton.propTypes = {
    handleLogoutRequest: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogoutRequest: () => (dispatch(doLogout()))
    }
};

export default connect(null, mapDispatchToProps)(LogoutButton);
