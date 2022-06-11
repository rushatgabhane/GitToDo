import CardList from '../components/CardList';
import * as Github from '../libs/Github';
import supabase from '../libs/supabase';
import {useAuthContext} from '../context/AuthContext';

const checkUser = () => {
    console.log(supabase.auth.user());
}

const TasksPage = () => {
    const {signOut} = useAuthContext();
    return (
        <>
            <h1>Hello world!</h1>
            <CardList
                title="Todo"
                // tasks={this.state.tasks}
            />
            <button type="submit" onClick={() => signOut()}>Sign Out</button>
            <button type="submit" onClick={() => checkUser()}>Check user</button>
        </>
    );
}

export default TasksPage;