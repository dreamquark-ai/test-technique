import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Header, Menu } from "./components/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TeamDetail, TeamList, UserList } from "./pages";

const client = new ApolloClient({
    uri: "http://localhost:5000",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <div className="app">
            <ApolloProvider client={client}>
                <Router>
                    <Header />
                    <div className="sliders-container">
                        <Menu />
                        <Switch>
                            <Route path="/users" component={UserList} />
                            
                            <Route path="/teams" component={TeamList} />
                            <Route path="/teams/:teamId" component={TeamDetail} />
                        </Switch>
                    </div>
                </Router>
            </ApolloProvider>
        </div>
    );
}

export default App;
