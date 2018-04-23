import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BanksSearchForm from '../components/forms/BanksSearchForm.jsx';
import {searchBanksByCriteria} from "../actions/bank-actions";
import Typography from "material-ui/es/Typography/Typography";
import BanksTable from "../components/tables/BanksTable.jsx";
import Card from "material-ui/es/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";

class BanksSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <BanksSearchForm onFormSubmitted={this.props.handleSearchRequest}/>

            {this.props.searchResults == undefined || this.props.searchResults.length === 0
                ? <Typography variant="body1">Поиск не дал результатов</Typography>
                : <Card>
                    <CardContent>
                        <BanksTable dataSource={this.props.searchResults}/>
                    </CardContent>
                </Card>
            }
        </div>
    }
}

BanksSearchPage.propTypes = {
    handleSearchRequest: PropTypes.func,
    searchResults: PropTypes.array
};

const mapStateToProps = (state) => {
    const {banksSearch} = state.banksSearchPage;

    return {
        searchResults: banksSearch.searchResults,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (searchCriteria) => dispatch(searchBanksByCriteria(searchCriteria))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BanksSearchPage);