import { Switch, Route } from 'react-router-dom';

function Main({Home, Profile}) {

    return (
        <Switch>
            <Route path='/' component={Home}></Route>
            <Route path='/profile' component={Profile}></Route>
        </Switch>
    )
}

export default Main