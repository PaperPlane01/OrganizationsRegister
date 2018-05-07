import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Switch, Route} from 'react-router-dom';
import {createMuiTheme} from 'material-ui/styles/';
import blue from 'material-ui/colors/blue';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import withStyles from "material-ui/es/styles/withStyles";
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import ruLocale from 'date-fns/locale/ru';
import {withRouter} from 'react-router-dom';
import TaxesCommitteeSearchPage from './pages/TaxesCommitteesSearchPage.jsx';
import {BankPage, BanksSearchPage, EconomicActivitiesSearchPage, FinancialStatisticsSearchPage, OrganizationPage,
    OrganizationAddingPage, OrganizationsSearchPage, OrganizationTypesSearchPage,
    PageNotFoundErrorPage, TaxesCommitteePage, TaxesCommitteesSearchPage, BankAddingPage,
    BankAccountsSearchPage, FinancialStatisticsAddingPage, BankAccountAddingPage, OverallSumSearchPage} from './pages';
import withWidth from "material-ui/es/utils/withWidth";
import compose from 'recompose/compose';
import {Hidden} from "material-ui/es/index";
import Drawer from "material-ui/es/Drawer/Drawer";
import DrawerItems from "./components/DrawerItems.jsx";

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%",
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: drawerWidth
        },
        overflowX: 'hidden'
    },
    appBar: {
        position: 'fixed',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('lg')]: {
            position: 'fixed',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        marginTop: 35,
        overflowX: 'auto',
    },
});


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerIsOpened: false
        }
    };

    handleDrawerToggle = () => {
        this.setState({drawerIsOpened: !this.state.drawerIsOpened});
    };

    closeDrawer = () => {
        this.setState({drawerIsOpened: false});
    };

    openDrawer = () => {
        this.setState({drawerIsOpened: true});
    };

    render() {
        let classes = this.props.classes;
        return <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <MuiThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={() => this.openDrawer()}
                                    className={classes.navIconHide}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="title" color="inherit" noWrap>
                                    Реестр предприятий
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Hidden lgUp>
                            <Drawer
                                variant="temporary"
                                anchor={'left'}
                                open={this.state.drawerIsOpened}
                                onClose={() => this.closeDrawer()}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    disableEnforceFocus:true
                                }}
                            >
                                <DrawerItems/>
                            </Drawer>
                        </Hidden>
                        <Hidden mdDown>
                            <Drawer
                                variant="permanent"
                                open
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <DrawerItems/>
                            </Drawer>
                        </Hidden>
                        <main className={classes.content}>
                            <Content/>
                        </main>
                    </div>
                </MuiThemeProvider>
        </MuiPickersUtilsProvider>
    }
}

class Content extends React.Component {
    render() { return <Switch>
        <Route exact path="/organizations-register/" component={OrganizationsSearchPage}/>
        <Route exact path='/organizations-register/financial-statistics/add-financial-statistics'
               component={FinancialStatisticsAddingPage}/>
        <Route exact path='/organizations-register/financial-statistics/overall-sum' component={OverallSumSearchPage}/>
        <Route exact path="/organizations-register/financial-statistics/" component={FinancialStatisticsSearchPage}/>
        <Route exact path="/organizations-register/banks" component={BanksSearchPage}/>
        <Route exact path='/organizations-register/banks/add-bank' component={BankAddingPage}/>
        <Route path="/organizations-register/banks/:id" component={BankPage}/>
        <Route exact path="/organizations-register/taxes-committees" component={TaxesCommitteeSearchPage}/>
        <Route path="/organizations-register/taxes-committees/:id" component={TaxesCommitteePage}/>
        <Route exact path="/organizations-register/economic-activities" component={EconomicActivitiesSearchPage}/>
        <Route exact path='/organizations-register/organizations/add-organization' component={OrganizationAddingPage}/>
        <Route path="/organizations-register/organizations/:bin" component={OrganizationPage}/>
        <Route exact path='/organizations-register/organization-types' component={OrganizationTypesSearchPage}/>
        <Route exact path='/organizations-register/taxes-committees' component={TaxesCommitteesSearchPage}/>
        <Route exact path='/organizations-register/bank-accounts' component={BankAccountsSearchPage}/>
        <Route exact path='/organizations-register/bank-accounts/add-bank-account' component={BankAccountAddingPage}/>
        <Route component={PageNotFoundErrorPage}/>
    </Switch>
    }
}

Content = withRouter(Content);

export default compose(withStyles(styles, {withTheme: true}), withWidth())(App);