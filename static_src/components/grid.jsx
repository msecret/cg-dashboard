
import style from 'cloudgov-style/css/cloudgov-style.css';
import React from 'react';

import createStyler from '../util/create_styler';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.styler = createStyler(style);
  }

  gridify(tiles, cols) {
    const gridTiles = [];
    let Tile;
    let rowTiles;
    const gridStyle = `grid-width-${12 / cols}`;
    for (let i = 0; i < tiles.length; i += cols) {
      rowTiles = [];
      for (let j = i; j < i + cols && j < tiles.length; j++) {
        Tile = tiles[j];
        rowTiles.push(<Tile className={ this.styler(gridStyle) } key={j} />);
      }
      gridTiles.push(
        <div className={ this.styler('grid') } key={i} >
          {rowTiles.slice()}
        </div>
      );
    }
    return gridTiles;
  }

  render() {
    return (<div>{ this.gridify(this.props.tiles, this.props.columns) }</div>);
  }
}

Grid.propTypes = {
  // tiles should be a list of react component classes
  tiles: React.PropTypes.arrayOf(React.PropTypes.func).isRequired,
  columns: React.PropTypes.number.isRequired
};
