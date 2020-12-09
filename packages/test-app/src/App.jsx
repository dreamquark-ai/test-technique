import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Header, Menu } from "./components/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TeamList } from "./pages/team-list";
import { UserList } from "./pages/user-list";

const client = new ApolloClient({
    uri: "http://localhost:5000",
    cache: new InMemoryCache(),
});

export function App() {
    return (
        <div className="app">
            <ApolloProvider client={client}>
                <Router>
                    <Header />
                    <div className="sliders-container">
                        <Menu />
                        <Switch>
                            <Route path="/users">
                                <UserList />
                            </Route>
                            <Route path="/teams">
                                <TeamList />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </ApolloProvider>
        </div>
    );
}
