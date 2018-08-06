import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';  
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from "react-bootstrap-table2-paginator";
import PropTypes from 'prop-types'
class QualityRanger extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onUpdate: PropTypes.func.isRequired
  }
  static defaultProps = {
    value: 0
  }
  getValue() {
    return parseInt(this.range.value, 10);
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return [
      <input
        { ...rest }
        key="number"
        ref={ node => this.range = node }
        type="number"
        min="0"
        max="100"
        onChange={ () => onUpdate(this.getValue()) }
      />,
      <i key='fas' 
        className="mx-2 text-success fas fa-question-circle" 
        title='sdf'></i>
    ];
  }
}

class StringWithProp extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
  }
  static defaultProps = {
    value: 0
  }
  getValue() {
    return parseInt(this.range.value, 10);
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return [
      <input
        { ...rest }
        key="string"
        ref={ node => this.range = node }
        type="string"
        min="0"
        max="100"
        onChange={ () => onUpdate(this.getValue()) }
      />,
      <i key='fas' 
        className="mx-2 text-danger fas fa-question-circle" 
        title='sdf'></i>
    ];
  }
}

function trClassFormat(rowData, rIndex) {
  if (rowData.price > 2102 && rowData.price < 2106)
    return "bg-danger";
  return "";
}

function rankFormatter(cell, row, rowIndex, formatExtraData) {
  if (cell)
    return (
      <i key='fas' 
        className="mx-2 text-danger fas fa-question-circle" 
        title={cell}></i>
    )

  return '';
}

function indication() {
  return 'Table is Empty';
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      columns: [
        {
          hidden: true,
          dataField: "id",
          text: "Product ID"
        },
        {
          align: 'center',
          headerAlign: 'center',
          dataField: "name",
          text: "Product Name"
        },
        {
          align: 'center',
          headerAlign: 'center',
          dataField: "price",
          sort: true,
          headerSortingStyle: {backgroundColor: 'lightblue'},
          text: "Product Price"
        },
        {
          align: 'center',
          headerAlign: 'center',
          dataField: "info",
          text: "Info",
          editable: false,
          formatter: rankFormatter,
          style: (cell, row, rowIndex, colIndex) => {
            if (cell) {
              return {backgroundColor: 'pink'};
            }
            return {};
          }
        }

      ]
    };

    this.addProduct = this.addProduct.bind(this);
  }

  
  addProduct(quantity) {
    let { products } = this.state;
    const startId = 1; //products.length;

    for (let i = 0; i < quantity; i++) {
      const id = startId + i;
      products.push({
        id: id,
        name: "Item name " + id,
        price: 2100 + i
      });
    }
    this.setState({ products: products });
  }

  componentDidMount() {
    let { products } = this.state;
    products.push({
      id: 1,
      name: 'product 1',
      price: 11.1,
      info: 'Error in value'
    });
    products.push({
      id: 2,
      name: 'product 2',
      price: 11.2
    });

    this.addProduct(25);
    this.setState({ products: products });
  }

  onTableChange () {
    console.log(arguments)
  }

  cellEdit () { 
    return cellEditFactory({
        mode: 'click',
        errorMessage: 'Error'
    });
  }

  render() {
    const { products, columns } = this.state;

    return (
        <BootstrapTable 
          hover
          condensed ={true}
          maxHeight={15}
          keyField="id"
          bootstrap4={true}
          noDataIndication={ indication }  
          cellEdit={ this.cellEdit() }
          pagination={paginationFactory({
            hidePageListOnlyOnePage: true,
            withFirstAndLast: true,
            showTotal: true,
            paginationTotalRenderer: (from, to, size) => (
              <span className="mx-3 react-bootstrap-table-pagination-total">
                Показано { from } по { to + 1 } из { size }
              </span>
            ),
            sizePerPage: 3,
            sizePerPageList: [
              {
                text: '5th', value: 5
              }, {
                text: '10th', value: 10
              }, {
                text: 'All', value: products.length?products.length:1
              } 
            ],
            firstPageTitle: 'Первая',
            prePageTitle: 'Предыдущая',
            nextPageTitle: 'Следующая',
            lastPageTitle: 'Последняя'
          })}
          onTableChange={this.onTableChange}
          remote={ {
              cellEdit: true
            } }
          data={ products } 
          columns={ columns }
          rowClasses={trClassFormat}
        />
    );
  }
}

export default App;
