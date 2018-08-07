import React, { Component } from 'react';
// import jQuery from 'jquery';
// import 'jquery/dist/jquery.min.js';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 

import 'popper.js/dist/popper.min.js'; 
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table-next.min.js';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.js';
import 'react-bootstrap-table2-editor/dist/react-bootstrap-table2-editor.min.js';


// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.js';

// import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';  
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from 'react-bootstrap-table2-overlay';
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
        className="mx-2 text-danger fas fa-question-circle" 
        title='sdf'></i>
    ];
  }
}

function trClassFormat(rowData, rIndex) {
  if (rowData.error_message)
    return "bg-warning";
  return "";
}

function errorFormatter(cell, row, rowIndex, formatExtraData) {
  if (cell)
    return (
      <i key={'fas'+rowIndex}
        className="mx-2 text-danger fas fa-question-circle" 
        title={cell}>
      </i>
    )

  return '';
}

function indication() {
  return 'Нет записей или поиск не дал результатов';
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      columns: [
        {
          // hidden: true,
          align: 'center',
          dataField: "id",
          text: "№",
          headerStyle: {
            width: '8%',
            textAlign: 'center'
          },
        },
        {
          align: 'center',
          headerAlign: 'center',
          dataField: "index_name",
          text: "Показатель",
          sort: true,
          filter: textFilter(),
        },
        {
          align: 'center',
          headerAlign: 'center',
          dataField: "code_name",
          text: "КОАТУУ",
          sort: true,
          editor: {
            type: Type.SELECT,
            options: [{
              value: 'Бориспільський',
              label: 'Бориспільський'
            }, {
              value: 'Обухівський',
              label: 'Обухівський'
            }, {
              value: 'Миронівський',
              label: 'Миронівський'
            }, {
              value: 'Володарський',
              label: 'Володарський'
            }]
        },
          validator: (newValue, row, column) => {
            if (newValue) {
              return {
                valid: false,
                message: 'Район не указан'
              };
            }
            return true;
          },
          filter: textFilter(),
        },
        {
          hidden: true,
          align: 'center',
          headerAlign: 'center',
          dataField: "object_name",
          text: "Наименование объекта",
          sort: true,
          filter: textFilter(),
        },
        {
          align: 'center',
          headerAlign: 'center',
          dataField: "data_value",
          text: "Данные",
          sort: true,
          filter: textFilter(),
        },
        {
          align: 'center',
          dataField: "error_message",
          text: "",
          editable: false,
          formatter: errorFormatter,
          headerStyle: {
            width: '8%',
          },
          style: (cell, row, rowIndex, colIndex) => {
            if (cell) {
              return {color: 'yellow'};
            }
            return {};
          }
        }
      ]
    };

  }

  componentDidMount() {
    let { products } = this.state;
    products.push({
      id: 1,
      code_name: 'Бориспільський',
      index_name: 'Індекс фінансової спроможності',
      data_value: '#DEL',
      error_id: 1,
      error_message: 'Не корректные данные'
    });
    products.push({
      id: 2,
      code_name: 'Обухівський',
      index_name: 'Індекс фінансової спроможності',
      data_value: 13.23,
      error_message: null
    });
    products.push({
      id: 3,
      code_name: 'Миронівський',
      index_name: 'Індекс фінансової спроможності',
      data_value: 17.23,
      error_message: null
    });
    products.push({
      id: 4,
      code_name: 'Володарський',
      index_name: 'Індекс фінансової спроможності',
      data_value: 17.23,
      error_message: null
    });
    products.push({
      id: 5,
      code_name: null,
      index_name: 'Індекс фінансової спроможності',
      data_value: 11.93,
      error_id: 2,
      error_message: 'Не верное указанный КОАТУУ'
    });

    this.setState({ products: products });
  }

  onTableChange () {
    console.log(arguments)
  }

  cellEdit (props) { 
    return cellEditFactory({
        mode: 'click',
        blurToSave: true,
        // errorMessage: 'Error Message'
    });
  }

  render() {
    const { products, columns } = this.state;

    return (
        <BootstrapTable 
          hover
          condensed ={ true }
          maxHeight={15}
          keyField="id"
          bootstrap4={ true }
          noDataIndication={ indication }  
          cellEdit={ this.cellEdit() }
          pagination={paginationFactory({
            hidePageListOnlyOnePage: true,
            withFirstAndLast: true,
            showTotal: true,
            paginationTotalRenderer: (from, to, size) => (
              <span className="mx-3 react-bootstrap-table-pagination-total">
                Показано с { from } по { to + 1 } из { size } записей
              </span>
            ),
            sizePerPage: 10,
            sizePerPageList: [
              {
                text: '5', value: 5
              }, {
                text: '10', value: 10
              }, {
                text: '20', value: 20
              }, {
                text: 'Все', value: products.length?products.length:1
              } 
            ],
            firstPageTitle: 'Первая',
            prePageTitle: 'Предыдущая',
            nextPageTitle: 'Следующая',
            lastPageTitle: 'Последняя'
          })}
          onTableChange={this.onTableChange}
          remote={ {
              cellEdit: false//true
            } }
          data={ products } 
          columns={ columns }
          rowClasses={trClassFormat}
          defaultSorted={ [{
            dataField: 'id',
            order: 'asc'
          }] }
          filter={ filterFactory() }
          overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
        />
    );
  }
}

export default App;
