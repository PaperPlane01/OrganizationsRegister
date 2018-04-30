import React from 'react';
import PropTypes from 'prop-types';
import {YearSelection} from "material-ui-pickers/DatePicker/YearSelection";
import withUtils from "material-ui-pickers/_shared/WithUtils";
import Dialog from "material-ui/es/Dialog/Dialog";
import DialogTitle from "material-ui/es/Dialog/DialogTitle";
import DialogContent from "material-ui/es/Dialog/DialogContent";
import Button from "material-ui/es/Button/Button";
import Input from "material-ui/es/Input/Input";
import DialogActions from "material-ui/es/Dialog/DialogActions";

class YearSelectionDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false
        }
    }

    handleYearSelect = (date) => {
        console.log(date);
        const year = date === null ? null : date.getFullYear();
        this.setState({isOpened: false}, () => this.props.onSelect(year));
    };

    handleClearRequest = () => {
        this.setState({isOpened: false}, () => this.props.onSelect(null));
    };

    handleOpenRequest = () => {
        this.setState({isOpened: !this.state.isOpened})
    };

    render() {
        const {disableFuture, disablePast, selectedYear, minYear, maxYear} = this.props;
        const date = selectedYear == undefined ? new Date() : new Date(selectedYear, 1, 1);
        const value = selectedYear == undefined ? '' : selectedYear;
        const minDate = new Date(minYear, 1, 1);
        const maxDate = new Date(maxYear, 1, 1);

        return <div>
            <Input fullWidth={true}
                   placeholder={'Выберите год'}
                   onClick={() => this.handleOpenRequest()}
                   readOnly={true}
                   value={value}
            />
            <Dialog open={this.state.isOpened}>
                <DialogTitle>
                   Выберите год
                </DialogTitle>
                <DialogContent>
                    <YearSelection disableFuture={disableFuture}
                                   disablePast={disablePast}
                                   onChange={date => this.handleYearSelect(date)}
                                   date={date}
                                   utils={this.props.utils}
                                   classes={this.props.classes}
                                   minDate={minDate}
                                   maxDate={maxDate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleOpenRequest()}
                            variant={'raised'}
                            color={'primary'}>
                        Закрыть
                    </Button>
                    <Button onClick={() => this.handleYearSelect(null)}
                            variant={'raised'}
                            color={'primary'}>
                        Очистить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

YearSelectionDialog.propTypes = {
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    selectedYear: PropTypes.number,
    onSelect: PropTypes.func,
    minYear: PropTypes.number,
    maxYear: PropTypes.number
};

export default withUtils()(YearSelectionDialog);