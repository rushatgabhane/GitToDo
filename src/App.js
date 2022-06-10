import React from 'react';
import CardList from './components/CardList';
import * as Github from './libs/Github';
import supabase from './libs/supabase';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            user: '',
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        const user = supabase.auth.user();
        console.log('user ', user);
    }

    signIn() {
        Github.signIn();
    }

    signOut() {
        Github.signOut();
    }

    checkUser() {
        const user = supabase.auth.user();
        console.log(user);
    }

    render() {
        return (
            <>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
                <CardList
                    title="Todo"
                    tasks={this.state.tasks}
                />
                <button type="submit" rel="noreferrer noopener" onClick={this.signIn}>Sign In</button>
                <button type="submit" onClick={this.signOut}>Sign Out</button>
                <button type="submit" onClick={this.checkUser}>Check user</button>
            </>
        );
    }
}

export default App;


//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     /* when the app loads, check to see if the user is signed in */
//     checkUser();
//     /* check user on OAuth redirect */
//     window.addEventListener('hashchange', function() {
//       checkUser();
//     });
//   }, [])
//   async function checkUser() {
//     /* if a user is signed in, update local state */
//     const user = supabase.auth.user();
//     setUser(user);
//   }
//   async function signInWithGithub() {
//     /* authenticate with GitHub */
//     await supabase.auth.signIn({
//       provider: 'github'
//     });
//   }
//   async function signOut() {
//     /* sign the user out */
//     await supabase.auth.signOut();
//     setUser(null);
//   }
//   if (user) {
//     return (
//       <div className="App">
//         <h1>Hello, {user.email}</h1>
//         <button onClick={signOut}>Sign out</button>
//       </div>
//     )
//   }
//   return (
//     <div className="App">
//       <h1>Hello, please sign in!</h1>
//       <button onClick={signInWithGithub}>Sign In</button>
//     </div>
//   );
// }
