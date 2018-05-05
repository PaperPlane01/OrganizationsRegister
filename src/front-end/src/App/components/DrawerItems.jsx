import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from "react-router-dom/es/Link";
import {ListItem, ListItemText} from "material-ui/es/List/index";
import {menuLinkStyle} from "../styles";
import Divider from "material-ui/es/Divider/Divider";
import LogoutButton from "./LogoutButton.jsx";
import {LoginDialog} from "./dialogs";
import {fetchCurrentUser} from "../actions/user-actions";

class DrawerItems extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {userLoggedIn, currentUser, fetchCurrentUser} = this.props;
        let displayAdminItems = false;

        if (userLoggedIn) {
            if (currentUser == undefined) {
                fetchCurrentUser();
            } else {
                if (currentUser.roles.map(role => (role.name)).includes('admin')) {
                    console.log('checking roles!');
                    displayAdminItems = true;
                }
            }
        }

        const menuItems = (<div>
                <ListItem>
                    {userLoggedIn ? <LogoutButton/> : <LoginDialog/>}
                </ListItem>

                <Link to="/organizations-register/" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'На главную'}/>
                    </ListItem>
                </Link>

                <Link to="/organizations-register/organization-types" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Типы предприятий'}/>
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

                <Link to="/organizations-register/bank-accounts" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Банковские счета'}/>
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

        const adminItems = (
            <div>
                <Divider/>

                <Link to="/organizations-register/organizations/add-organization" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Добавить организацию'}/>
                    </ListItem>
                </Link>

                <Link to="/organizations-register/banks/add-bank" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Добавить банк'}/>
                    </ListItem>
                </Link>

                <Link to="/organizations-register/financial-statistics/add-financial-statistics" style={menuLinkStyle}>
                    <ListItem button>
                        <ListItemText primary={'Добавить финансовые показатели'}/>
                    </ListItem>
                </Link>
            </div>
        );

        const items = [menuItems];

        if (displayAdminItems) {
            items.push(adminItems);
        }

        return <div>
            {items}
        </div>
    }
};

DrawerItems.propTypes = {
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.object,
    fetchCurrentUser: PropTypes.func,
    onModalOpened: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.userData.loggedIn,
        currentUser: state.userData.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItems);