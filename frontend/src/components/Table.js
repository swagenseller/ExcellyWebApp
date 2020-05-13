import React, { Component } from "react";
import ReactDataGrid from 'react-data-grid';
import ModalContent from './ModalContent';
import {Button} from 'react-bootstrap';
import './../theme.css';

const columns = [
  { key: "edit", name: "", width: 100, editable: false, sortable: false  },
  { key: "name", name: "Name", editable: false, sortable: true, sortDescendingFirst: true },
  { key: "brand", name: "Brand Name", editable: false, sortable: true },
  { key: "pet", name: "Food For", editable: false, sortable: true },
  { key: "price", name: "Price", editable: false, sortable: true }
];

class Table extends React.Component {
  constructor(props){
    super(props)
  
    this.state = { 
      initRows: this.props.data,
      rows: this.props.data,
      isOpen: false,
      selectRow: null,  
      rowIndex: null,
      initIndex: null,
      title: ''
    }
  }
  // implement for changing data
   /* componentDidMount() {
      // refactor into a function later
      let cols = [{ key: "edit", name: "", width: 100, editable: false, sortable: false  }]
      const keys = Object.keys(this.props.data[0]);
      console.log(keys);
     
      // end of refactor
      this.setState({
        initRows: this.props.data,
        rows: this.props.data,
      });
    } */
    getCellActions = (column, row) => {
      const cellActions = [
        {
          icon: <span className="text-white bg-primary rounded">Edit</span>,
          callback: () =>{
            const index = this.state.rows.indexOf(row)
            //console.log("index is: " + index)
            const iRowIndex = this.state.initRows.indexOf(row)
            this.setState({
              isOpen: true,
              selectRow: row,  
              rowIndex: index, 
              initIndex: iRowIndex,
              title: "edit"
            });
          }
    
        },
        {
          icon: <span className="text-white bg-danger rounded"> Delete </span>,
          callback: () => {
            const index = this.state.rows.indexOf(row)
            //console.log("index is: " + index)
            const iRowIndex = this.state.initRows.indexOf(row)
            this.setState({
              isOpen: true,
              selectRow: row,  
              rowIndex: index, 
              initIndex: iRowIndex,
              title: "delete",
               
            });
          }
        }

      ]
      return column.key === "edit" ? cellActions : null; 
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
      this.setState((state) => {
        const rows = state.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
          rows[i] = { ...rows[i], ...updated };
        }
        return rows;
      });
    };

    // used to sort rows by either ascending or descending 
    sortRows = (sortColumn, sortDirection) =>  {
			const initialRows = [...this.state.rows];
			const comparer = (a, b) => {
        if(typeof a[sortColumn] === "string"){
          if (sortDirection === "ASC") {
            return a[sortColumn].toUpperCase() > b[sortColumn].toUpperCase() ? 1 : -1;
          } else if (sortDirection === "DESC") {
            return a[sortColumn].toUpperCase() < b[sortColumn].toUpperCase() ? 1 : -1;
          }
        } else if (typeof a[sortColumn] === "number"){
          if (sortDirection === "ASC") {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
          } else if (sortDirection === "DESC") {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
          }
        }
			};
			return sortDirection === "NONE" ? this.state.initRows : [...initialRows].slice().sort(comparer);
    };
    

    // working on the form part 
    onResponse = () =>{
      this.setState({
        isOpen: false,
        selectRow: null,  
        rowIndex: null,
        initIndex: null,
        title: ''
      });
    }

    // delete row from table call
    onDelete = (rowIndex, initIndex) => {
      // removes from this.state.rows
      const rows = [...this.state.rows];
      rows.splice(rowIndex, 1); //
      // removes from initialRows
      const iRows = [...this.state.initRows];  // rows
      iRows.splice(initIndex, 1)
      this.setState({ 
        rows: rows, 
        initRows: iRows,
      });
      this.onResponse();
    }

    onEdit = (rowIndex, newRow) => {
      const newRows = [...this.state.rows];

      newRows[this.state.rowIndex] = newRow;
      this.setState({rows: newRows})
      //this.onGridRowsUpdated(rowIndex, rowIndex+1, newRow);
      this.onResponse();
      
    }
    addOpen = () =>{
      this.setState({
        isOpen: true,
        selectRow: {name: '', brand: '', pet: '', price: 0},
        title: 'add' 
      })
    }

    // the new row does not have an Id though :/
    onAdd = (newRow) =>{
      // adds to current rows
      const rows = [...this.state.rows];
      rows.push(newRow) // const rows = [...this.state.rows, newRow]
      // addes to intial rows
      const iRows = [...this.state.initRows];  
      iRows.push(newRow)

      this.setState({rows: rows, initRows: iRows})
      this.onResponse();
    }



    render() {
      return (
        <div>
          
          <ReactDataGrid
            columns={columns}
            rowGetter={(i) => this.state.rows[i]}
            rowsCount={this.state.rows.length}
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellsSelect={true}
            getCellActions={this.getCellActions}
            onGridSort= {(sortColumn, sortDirection) => this.setState({ rows: this.sortRows(sortColumn, sortDirection) }) }
          />
          <Button variant="success" onClick={this.addOpen}>Add new row</Button> 

          {this.state.isOpen && <ModalContent
              isOpen={this.state.isOpen}
              onResponse={this.onResponse}
              selectRow={this.state.selectRow}  
              rowIndex={this.state.rowIndex}
              initIndex={this.state.initIndex}
              onDelete={this.onDelete}
              title={this.state.title}
              onEdit={this.onEdit}
              onAdd={this.onAdd}
          />}
        </div>
      ); 
    }
  }
  
  export default Table;