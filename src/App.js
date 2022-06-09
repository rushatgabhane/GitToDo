import React from 'react';
import CardList from './components/CardList';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        };
    }

    render() {
        return (
            <>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
                <CardList
                    title="Todo"
                    tasks={this.state.tasks}
                />
            </>
        );
    }
}

export default App;
