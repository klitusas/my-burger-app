import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    /**
     * Need to update our component’s state using the current state of the component.
     * Directly accessing this.state to update our component is not a reliable way 
     * to update our component’s next state.
     * Thats why susing function expression
     * 'showSideDrawer: !prevState.showSideDrawer' especially in these cases
     */
    sideDrawerToggleHandler = () => {
        
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    } 
    render() {
        return (
            <Aux>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}


export default connect(mapStateToProps)(Layout);