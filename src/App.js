import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import seedPalettes from './seeds/seedPalettes';
import PaletteList from './components/PaletteList/PaletteList';
import Palette from './components/Palette/Palette';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            palettes: seedPalettes
        }

        this.findPalette = this.findPalette.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }

    findPalette(id) {
        return this.state.palettes.find(palette => palette.id === id);
    }

    savePalette(newPalette) {
        this.setState({ palettes: [...this.state.palettes, newPalette] });
    }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={routeProps => <PaletteList palettes={this.state.palettes} {...routeProps} />} 
                />
                <Route
                    exact
                    path="/palette/new"
                    render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />}
                />
                <Route
                    exact
                    path="/palette/:id"
                    render={routeProps => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />}
                />
                <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={routeProps => <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId} />}
                />
            </Switch>
        );
    }
}

export default App;