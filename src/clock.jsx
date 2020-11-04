import React, { Component,PureComponent, useState, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button , Card} from 'react-bootstrap';


const PRODUCTS = [
    {category: "Sporting Goods", price : "$49.99", stocked:true, name:"Footbal"},
    {category: "Sporting Goods", price : "$4.99", stocked:true, name:"Baseall"},
    {category: "Sporting Goods", price : "$29.99", stocked:false, name:"Basketball"},
    {category: "Electronics", price : "$99.99", stocked:true, name:"iPod Touch"},
    {category: "Electronics", price : "$459.99", stocked:true, name:"iPhone"},
    {category: "Electronics", price : "$89.99", stocked:false, name:"Nexus 7"},
    {category: "Mecanics", price : "$59.99", stocked:true, name:"Car"},

];

function ProductRow({product})
{
    const name = product.stocked ? product.name :<span className="text-danger">{product.name}</span>
    return  <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
}

function ProductCategoryRow({category})
{
    return  <tr>
                <th colSpan="2">{category}</th>
            </tr>
}

function ProductTable ({products, inStockOnly, filterText})
{
    const rows = [];
    let lastCategory = null;
    products.forEach(product => {
        if((inStockOnly && !product.stocked) || product.name.indexOf(filterText) === -1) 
        {
            return
        }


        if ( product.category !== lastCategory ) 
        {
                lastCategory = product.category
                rows.push(<ProductCategoryRow key={lastCategory} category={product.category}/>)
        }
        rows.push(<ProductRow key={product.name} product={product}/>)
    })
    return  <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
}

class SearchBar extends Component
{
    constructor(props)
    {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(e)
    {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange(e)
    {
        this.props.onStockChange(e.target.checked)
    }

    render()
    {
        const {filterText, inStockOnly} = this.props
        return  <div className="mb-3">
                    <div className="form-group mb-0">
                        <input type="text" value={filterText} className="form-control" placeholder="Rechercher" onChange={this.handleFilterTextChange}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" checked={inStockOnly}  className="form-check-input" id="stock" onChange={this.handleInStockChange}/>
                        <label htmlFor="stock" className="form-check-label">Produit en stock</label>
                    </div>
                </div>
    }
}

class FilterableProductsTable extends PureComponent
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            filterText :'',
            inStockOnly :false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }

    handleFilterTextChange(filterText)
    {
        this.setState({filterText})
    }

    handleInStockOnlyChange(inStockOnly)
    {
        this.setState({inStockOnly})
    }
    
    render ()
    {
        const {products} = this.props 
    return  <Fragment>
                <SearchBar 
                filterText = {this.state.filterText}
                inStockOnly ={this.state.inStockOnly}
                onFilterTextChange = {this.handleFilterTextChange}
                onStockChange = {this.handleInStockOnlyChange}
                />
                <ProductTable 
                products={PRODUCTS}
                filterText ={this.state.filterText}
                inStockOnly ={this.state.inStockOnly} 
                />
            </Fragment>
    }
}

export  class Clock extends Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
           
        }
       
    }


    render()
    {
        return <div className="container">
                    <FilterableProductsTable products ={PRODUCTS}/>
                </div>
    }
}