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
import LeftDrawer from './components/LeftDrawer.jsx'
import FinancialStatisticsSearchPage from './pages/FinancialStatisticsSearchPage.jsx'
import withTheme from "material-ui/es/styles/withTheme";
import withStyles from "material-ui/es/styles/withStyles";
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import ruLocale from 'date-fns/locale/ru';
import OrganizationsSearchPage from "./pages/OrganizationsSearchPage.jsx";
import {withRouter} from 'react-router-dom';
import PageNotFoundErrorPage from './pages/PageNotFoundErrorPage.jsx';
import OrganizationPage from "./pages/OrganizationPage.jsx";
import OrganizationAddingPage from "./pages/OrganizationAddingPage.jsx";
import BanksSearchPage from "./pages/BanksSearchPage.jsx";
import BankPage from "./pages/BankPage.jsx";
import TaxesCommitteeSearchPage from './pages/TaxesCommitteesSearchPage.jsx';
import TaxesCommitteePage from './pages/TaxesCommitteePage.jsx';
import EconomicActivitiesSearchPage from './pages/EconomicActivitiesSearchPage.jsx';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});


const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'auto',
        position: 'relative',
        width: '100%',
        height: '100%',
        marginLeft: drawerWidth,
        [theme.breakpoints.down('sm')]: {
           marginLeft: 0,
        },
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px) !important`
        }
    },
    appBar: {
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            marginLeft:0,
            position: 'fixed'
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none !important',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
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

    render() {
        let classes = this.props.classes;
        return <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={classes.navIconHide}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="title" color="inherit" noWrap>
                                    Реестр предприятий
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <LeftDrawer opened={this.state.drawerIsOpened}
                                    theme={theme}
                                    onClose={this.handleDrawerToggle}
                                    paper={classes.drawerPaper}/>
                        <main className={classes.content}>
                            <div className={classes.toolbar}/>
                            <Content/>
                        </main>
                    </div>
                </MuiThemeProvider>
            </div>
        </MuiPickersUtilsProvider>
    }
}

class Content extends React.Component {
    render() { return <Switch>
        <Route exact path="/organizations-register/" component={OrganizationsSearchPage}/>
        <Route path="/organizations-register/financial-statistics/" component={FinancialStatisticsSearchPage}/>
        <Route exact path="/organizations-register/banks" component={BanksSearchPage}/>
        <Route path="/organizations-register/banks/:id" component={BankPage}/>
        <Route exact path="/organizations-register/taxes-committees" component={TaxesCommitteeSearchPage}/>
        <Route path="/organizations-register/taxes-committees/:id" component={TaxesCommitteePage}/>
        <Route exact path="/organizations-register/economic-activities" component={EconomicActivitiesSearchPage}/>
        <Route exact path='/organizations-register/organizations/add-organization' component={OrganizationAddingPage}/>
        <Route path="/organizations-register/organizations/:bin" component={OrganizationPage}/>
        <Route component={PageNotFoundErrorPage}/>
    </Switch>
    }
}

Content = withRouter(Content);

export default (withStyles(styles, withTheme({theme})))(App)