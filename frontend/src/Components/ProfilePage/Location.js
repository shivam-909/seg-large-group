import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Loading from "../Loading/Loading";

export class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: this.props.defaultLocation };
    }

    handleChange = address => {
        if(this.props.onChange){
            this.props.onChange();
        }
        this.setState({ address: address });
    };

    handleSelect = address => {
        this.setState({address: address})
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={{
                    region: "uk",
                }}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input id={"locationInput"}
                            {...getInputProps({
                                placeholder: 'Search City ...',
                                className: 'location-search-input w-full border-[1px] border-dark-theme-grey p-2 rounded-md',
                            })}
                            disabled={this.props.disabled}
                        />
                        <div className="autocomplete-dropdown-container border-[1px] border-dark-theme-grey rounded-md">
                            {loading && <div className={"flex justify-center"}><Loading/></div>}
                            {suggestions.map(suggestion => {
                                const className = "p-2"
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div{...getSuggestionItemProps(suggestion, {className, style,})}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}
