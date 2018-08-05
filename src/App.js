import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
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
        title={'sdfsdf'}
        min="0"
        max="100"
        onChange={ () => onUpdate(this.getValue()) }
      />,
      <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
        Tooltip with HTML
      </button>,
      <span key='badge' className="badge badge-danger">?</span>
    ];
  }
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
          text: "Product Name",
          editorRenderer: (editorProps, value) => (
            <StringWithProp { ...editorProps } value={ value } />
          )
        },
        {
          dataField: "price",
          sort: true,
          headerSortingStyle: {backgroundColor: 'lightblue'},
          text: "Product Price",
          editorRenderer: (editorProps, value) => (
            <QualityRanger { ...editorProps } value={ value } />
          )
        }
      ]
    };

    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(quantity) {
    let { products } = this.state;
    const startId = products.length;

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
    this.addProduct(12);

    products.push({
      id: 1,
      name: 'product 1',
      price: 11.1
    });
    products.push({
      id: 2,
      name: 'product 2',
      price: 11.2
    });

    this.setState({ products: products });
  }

  onTableChange () {
    console.log(arguments)
  }

  render() {
    const { products, columns } = this.state;

    return (
      <div className="container">
        <BootstrapTable 
          striped
          hover
          condensed
          maxHeight={15}
          keyField="id"
          bootstrap4={true}  
          cellEdit={ cellEditFactory({ mode: 'click' }) }
          pagination={paginationFactory()}
          onTableChange={this.onTableChange}
          remote={ {
              filter: false,
              pagination: false,
              sort: false,
              cellEdit: true
            } }
          data={ products } 
          columns={ columns }
        />
      </div>
    );
  }
}

export default App;
