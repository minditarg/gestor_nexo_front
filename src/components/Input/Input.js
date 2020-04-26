import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';



function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}


function getSuggestions(value,suggestions) {

  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const useStyles = makeStyles(theme => ({
   root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));


const Input = (props) => {
    const classes = useStyles();
    let inputElement = null;
    let textValidation = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        textValidation = props.textValid



    }

    const [stateSuggestions, setSuggestions] = React.useState([]);

    const handleSuggestionsFetchRequested = ({ value }) => {

        setSuggestions(getSuggestions(value,props.elementConfig.suggestions));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = (event,{ newValue } ) => {
     props.changed(event,newValue);

  };

  const handleChangeSelect = (event) => {
   props.changed(event);

};

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
    };

    switch (props.elementType) {
        case ('input'):
            inputElement = <TextField style={{ marginTop: '15px' }}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):

            inputElement =
                <TextField style={{ marginTop: '20px' }}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    multiline={true}
                    />;

            break;
            case ('checkbox'):

            inputElement =
            <FormControlLabel style={{ marginTop: '20px' }} control={<Checkbox
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed}
                checked={props.value}
              />} label={props.elementConfig.label}/>
              break;
        case ('select'):
            inputElement = (
                <FormControl style={{ minWidth: '180px', marginTop: '15px' }}>
                    <InputLabel >{props.elementConfig.label}</InputLabel>
                    <Select
                        {...props.elementConfig}
                        value={props.value}
                        onChange={handleChangeSelect}

                        >
                        {props.elementConfig.options.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.displayValue}</MenuItem>

                        ))}


                    </Select>
                </FormControl>
            );
            break;
        case ('autosuggest'):
            inputElement = (
              <FormControl style={{ minWidth: '180px', marginTop: '15px' }}>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        value: props.value,
                        onChange: handleChange,
                        ...props.elementConfig
                    }}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options =>{
                        return(
                        <Paper {...options.containerProps} square>
                            {options.children}
                        </Paper>
                    )}}
                    />
                    </FormControl>

            );
            break;
        default:
            inputElement = <input

                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
            <span style={{ fontSize: '80%', color: 'red' }}>{textValidation}</span>
        </div>
    );

};

export default Input;
