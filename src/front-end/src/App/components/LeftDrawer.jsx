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
import {menuLinkStyle} from "../styles/";

class LeftDrawer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false,
        }
    }

    render() {
        const {opened, theme, paper, userLoggedIn} = this.props;

        const menuItems = (<div>
                <ListItem>
                    {userLoggedIn ? <LogoutButton/> : <LoginFormDialog/>}
                </ListItem>

                <Link to="/organizations-register/" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'На главную'}/>
                    </ListItem>
                </Link>

                <Link to="/organizations-register/financial-statistics" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Финансовые показатели'}/>
                    </ListItem>
                </Link>

                <Link to="/organizations-register/banks" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Банки'}/>
                    </ListItem>
                </Link>

                <Link to="/organizations-register/taxes-committees" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Налоговые комитеты'}/>
                    </ListItem>
                </Link>

                <Link to="/organizations-register/economic-activities" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Хозяйственные деятельности'}/>
                    </ListItem>
                </Link>
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