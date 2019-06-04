import React, { PureComponent } from 'react';
import Container from './Container'
import Select from "react-virtualized-select";
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";

class SelectCheckbox extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            values: props.value || []
        };
    }

    render(){

        const { values } = this.state;

        return (
            <Container {...this.props} > 
                {({ options, onChange, id, ...inputProps }) => 
                <Select 
                    {...inputProps}                    
                    searchable
                    value={values}                    
                    options={options}
                    ignoreAccents                    
                    onChange={value => this.setState({ values: value }, () => onChange({ id, value: this.state.values }))}                    
                    // optionRenderer={Option}                    
                    clearAllText="Remover todos"
                    searchPromptText="Digite o que procura"
                    noResultsText="Nenhum resultado encontrado."                    
                />}
            </Container>)
    }
};

SelectCheckbox.defaultProps = {
  options: [],
  multi: false
};

export default SelectCheckbox;
