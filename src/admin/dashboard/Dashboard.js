import React, { Component } from 'react'
import './Dashboard.css'
import { fetchUserCount, fetchProductCount, fetchCommentCount, fetchOrderCount } from '../../utils/utils'
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            briefCount: null
        }
    }

    async componentDidMount() {
        const briefCount = await Promise.all([fetchUserCount(), fetchProductCount(), fetchCommentCount(), fetchOrderCount()]);
        this.setState({
            briefCount: briefCount
        })
    }

    render() {
        const { briefCount } = this.state;
        return <div className="dashboard">
            <h4>DASHBOARD</h4>
            <div className="brief-count">
                {briefCount && briefCount.map((value, index) => {
                    return <div className="static-card">
                        <p className="count-title">
                            {Object.keys(value)[0]}
                        </p>
                        <p className="count-value">{value[Object.keys(value)[0]]}</p>
                    </div>
                })}
            </div>
        </div>
    }
}

export default Dashboard;