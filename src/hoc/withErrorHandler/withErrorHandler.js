import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux';

const withErrorHAndler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        /**
         * Used to be componentDidMount but it is called 
         * after all child component sare rendered. So 
         * componentDidMount will only be called once component 
         * did mount was called in WrappedComponent, so interceptors were never set.
         * To fix we use ComponentWIllMount - called before children component are render
         *
         */
        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                /** need to return something to continue */
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render() {
            return (
                <Aux>
                    <Modal 
                         show={this.state.error}
                         modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHAndler;