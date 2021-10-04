import React, { useState } from 'react';
import {  Statistic, Button, Grid, Segment , Input, Menu, Container, Image, Table, Card } from 'semantic-ui-react';
import axios from 'axios';
import { useTable } from 'react-table'
import ReactTable from 'react-table/react-table'
import 'react-table/react-table.css'
import './Dashboard.css'
import GetCrypto from './Coins/GetCrypto';
import Logo from './images/moon-logo-2.svg'
import Logo2 from './images/moon-logo.svg'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
            balance: 0,
            trades: [],
            pair: "ETHUSDC",
            time: 10,
            sortOptions: [{id: 'time', desc: true}]
        }
        this.setUserID();    
    }
    
    setUserID() {
        let user_id = 0;
        let get_user_id_url = 'http://localhost:8000/users/getuserid';
        axios.post(get_user_id_url, {})
            .then(response => {
                console.log(response);
                user_id = response.data;
                this.setState({
                    user_id: user_id,
                });
                
            }).then(response => {
                if (user_id != null || user_id !== "") {
                    this.getBalance();
                    this.getTrades();
                }
            })
    }
    getBalance() {
        let balance = 0;
        const balance_url = 'http://localhost:8000/users/balance'
        axios.post(balance_url, {
            user_id: this.state.user_id
        })
            .then(response => {
                console.log(response);
                balance = response.data;
                this.setState({
                    balance: balance,
                })
            })
    }
    getStateBalance() {
        let response = this.state.balance;
        return response;
    }

    getTrades() {
        let trades = [];
        const trades_url = 'http://localhost:8000/botapi/fetchtrades'
        axios.post(trades_url, {
            user_id: this.state.user_id
        })
        .then(response => {
            console.log(response);
            if (response.status === 200){
                trades = JSON.parse(response.data);
            }

            this.setState({
                trades: trades
            })
        })
    }

    runBot(reactInstance) {
        const run_url = 'http://localhost:8000/botapi/start';
        axios.post(run_url, {
            user_id: reactInstance.state.user_id,
            pair: reactInstance.state.pair,
            time: reactInstance.state.time,
        })
        .then(response => {
            console.log(response);
        })

    }

    renderTable() {
        return this.state.trades.map((history) => {
            return(
                <tr>
                    <td>{ history.trade_id }</td>
                    <td>{ history.pair }</td>
                    <td>{ history.time }</td>
                    <td>{ history.order_type }</td>
                    <td>{ history.price }</td>
                    <td>{ history.cost }</td>
                    <td>{ history.fee }</td>
                    <td>{ history.vol }</td>
                    <td>{ history.margin }</td>
                </tr>
            )
        })
    }

    


render() {

    const handleLogout = () => {
        this.props.history.push('/signup')
        return this.setState({user_id: 0}) 

    }

    let balance = this.getStateBalance()


    const columns = [
        {   
            Header: "Trade ID",
            accessor: 'trade_id' 
        }, 
        {   Header: "Pair",
            accessor: 'pair' 
        },
        {   Header: "Time",
            accessor: 'time',
        },
        { Header: "Order Type",
            accessor: 'order_type' 
        },
        { Header: "Price",
            accessor: 'price' 
        },
        { Header: "Cost",
            accessor: 'cost' 
        },
        { Header: "Fee",
            accessor: 'fee'
        },
        { Header: "Vol",
            accessor: 'vol' 
        },
        { Header: "Margin",
            accessor: 'margin' 
        },
    ]
    return (
        <div className="container" >
            <Menu className="dashboard-header">
                <Image
                    src={ Logo2 } size="small" style={{ height:90 }} alt="moon">
                </Image>
                <Menu.Menu position='right'>
                    <Menu.Item
                    name='logout'
                    onClick={ handleLogout }
                    />
                </Menu.Menu>
            </Menu>
            <Container>
                <Grid cellec to columns={3} margin='10px 10px 10px 10px'> 
                    <Grid.Row>
                        <Grid.Column>
                            <div className="balance-container" class="ui orange inverted segment">
                                <Statistic size="small" color="white">
                                    <Statistic.Label >
                                        Balance
                                    </Statistic.Label>
                                    <Statistic.Value>
                                        <i class="dollar sign icon"/>
                                        { balance }
                                    </Statistic.Value>
                                    
                                </Statistic>
                            </div>
                            
                        </Grid.Column>
                        <Grid.Column>
                            <div className="coins-container" class="ui inverted segment">
                                <GetCrypto/>
                            </div>
                       </Grid.Column>
                
                        <Grid.Column>
                            <Segment className="trades-hist-container"> 
                                Trade History    
                                <ReactTable
                                    data={this.state.trades}
                                    columns={columns}
                                >
                                </ReactTable>
                            </Segment>
                            <Button 
                                className="trade-bttn" 
                                class="ui icon buttons"
                                color="green"
                                onClick={ () => { this.runBot(this)} }
                                >
                                <i 
                                class="play icon"/>
                                Trade
                            </Button> 
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                    
                        </Grid.Column>
                    </Grid.Row>
      
                </Grid>
            </Container>
        </div>

        
    )
}
}

export default Dashboard;

