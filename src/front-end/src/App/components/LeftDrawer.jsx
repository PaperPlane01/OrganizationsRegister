import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import {connect} from 'react-redux';
import LoginFormDialog from './LoginFormDialog.jsx';
import LogoutButton from './LogoutButton.jsx';
import { Link } from "react-router-dom";
import ListItem from "material-ui/es/List/ListItem";
import ListItemText from "material-ui/es/List/ListItemText";

class LeftDrawer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false,
        }
    }

    render() {
        const {opened, theme, paper, userLoggedIn} = this.props;

        let menuItems = (<div>
                <Link to="/organizations-register/" style={{textDecoration: 'none'}}>
                    <ListItem button>
                        <ListItemText primary={'На главную'}/>
                    </ListItem>
                </Link>

                <Link to="/organizations-register/financial-statistics" style={{textDecoration: 'none'}}>
                    <ListItem button>
                        <ListItemText primary={'Финансовые показатели'}/>
                    </ListItem>
                </Link>

                <ListItem>
                    {userLoggedIn ? <LogoutButton/> : <LoginFormDialog/>}
                </ListItem>

            </div>
        );

        return <div>
            <Hidden smDown>
                <Drawer open={true}
                        variant="permanent"
                        theme={theme}
                        anchor={'left'}
                        classes={{
                            paper: paper,
                        }}>
                    {menuItems}
                </Drawer>
            </Hidden>
            <Hidden mdUp>
                <Drawer open={opened}
                        variant="temporary"
                        theme={theme}
                        anchor={'left'}
                        onClose={this.props.onClose}
                        classes={{
                            paper: paper,
                        }}>
                    {menuItems}
                </Drawer>
            </Hidden>
        </div>

    }
}

LeftDrawer.propTypes = {
    opened: PropTypes.bool,
    theme: PropTypes.object,
    onClose: PropTypes.func,
    paper: PropTypes.string,
    userLoggedIn: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.userData.loggedIn
    }
};

export default connect(mapStateToProps)(LeftDrawer);