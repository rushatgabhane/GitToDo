import React from 'react';
import CardList from './components/CardList';
import * as Github from './libs/Github';
import supabase from './libs/supabase';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            user: null,
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    componentDidMount() {
        this.checkUser();
        window.addEventListener('hashchange', () => this.checkUser());
    }

    signIn() {
        Github.signIn();
    }

    signOut() {
        Github.signOut();
        this.setState({
            user: null,
        });
    }

    checkUser() {
        const user = supabase.auth.user();
        this.setState({
            user,
        });
    }

    render() {
        if (this.state.user) {
            return (
                <>
                    <h1>Hello world!</h1>
                    <CardList
                        title="Todo"
                        tasks={this.state.tasks}
                    />
                    <button type="submit" onClick={this.signOut}>Sign Out</button>
                    <button type="submit" onClick={this.checkUser}>Check user</button>
                </>
            );
        }
        return (
            <>
                <h1>Hello world!</h1>
                <CardList
                    title="Todo"
                    tasks={this.state.tasks}
                />
                <button type="submit" onClick={this.signIn}>Sign In</button>
                <button type="submit" onClick={this.checkUser}>Check user</button>
            </>
        );
    }
}

export default App;
