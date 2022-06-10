import * as Github from './libs/Github';

const TasksPage = () => {
    return (
        <>
            <h1>Hello world!</h1>
            <CardList
                title="Todo"
                // tasks={this.state.tasks}
            />
            {/* <button type="submit" onClick={this.signOut}>Sign Out</button>
            <button type="submit" onClick={this.checkUser}>Check user</button> */}
        </>
    );
}

export default TasksPage;