import React from 'react';
import {Chip, Typography} from "material-ui";
import Select from 'react-select';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import CancelIcon from 'material-ui-icons/Cancel';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import PropTypes from 'prop-types';
import ClearIcon from 'material-ui-icons/Clear';
import Option from './Option.jsx';

class WrappedSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, onSelect, ...other } = this.props;

        return <Select
            optionComponent={Option}
            noResultsText={<Typography>{'Результатов не найдено'}</Typography>}
            arrowRenderer={arrowProps => {
                return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
            }}
            clearRenderer={() => <ClearIcon />}
            valueComponent={valueProps => {
                const { value, children, onRemove } = valueProps;

                const onDelete = event => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemove(value);
                };

                if (onRemove) {
                    return (
                        <Chip
                            tabIndex={-1}
                            label={children}
                            className={classes.chip}
                            deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
                            onDelete={onDelete}
                        />
                    );
                }

                return <div className="Select-value">{children}</div>;
            }}
            {...other}
        />
    }
}

WrappedSelect.propTypes = {
    classes: PropTypes.object
};

export default WrappedSelect;