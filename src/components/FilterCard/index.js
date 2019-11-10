import React, { Component } from "react";

/**
 * Class representing a Tech Card Component
 */
export class FilterCard extends Component {

  constructor(props) {
    super(props)
    this.filterFields = [
      {name:'Beginner',value:'Beginner'},
      {name:'Intermediate',value:'Intermediate'},
      {name:'Advance',value:'Advance'}
    ];
    this.state = {filterSelection:{}};
  }

  refreshData(e){
    let filterSelected =this.state.filterSelection;
    let eleVal =  e.target.value;
    if(e.target.checked) {
      filterSelected[eleVal] = true;
    } else {
      filterSelected[eleVal] = false;
    }
    this.setState({filterSelection: filterSelected})
  this.props.filterchangeState(this.state.filterSelection);
  }

  renderFilter() {
    let html =[];
    this.filterFields.forEach((element,index) => {
      html.push(<div className="filter-field">
          <input id={index} type="checkbox" value={element.value} onChange={this.refreshData.bind(this)} />
          <label for={index}>
            <span></span>
            {element.name}
            <ins><i>{element.name}</i></ins>
          </label>
      </div>)
    })
    return html;
  }

/**
 * @function render
 * render function of Tech Card Class
 */
  render() {
    return (
      <div className="filter-container">
        {this.renderFilter()}
      </div>
    );
  }
}

export default FilterCard;
