import React, { Component } from 'react'


const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        /* this 'component' property will be set to be dynamically loaded
        component, so once this component was mounted (wrapping 
        higher order component) */
        componentDidMount(){
            /* async importComponent should be a function reference */
            importComponent()
                .then(cmp => {
                    /*due to the setup we have with create-react-app */
                    this.setState({component: cmp.default});
                })
        }

        render () {
            const C= this.state.component;
            /* if C is set we render C as a component, {...props} to 
            * pass any props we may need. null if the component is not 
            * set yet or it hasnt been resolved 
            */
            return C ? <C {...this.props}/> : null;
        }
    }
}

export default asyncComponent;