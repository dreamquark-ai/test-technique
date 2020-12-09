// Libs
import React from "react";

// Components
import { Link } from "react-router-dom";
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from "@rmwc/top-app-bar";

export function Header() {
    return (
        <TopAppBar>
            <TopAppBarRow>
                <TopAppBarSection>
                    <TopAppBarTitle>
                        <Link to="/">
                            TechnicalTest DreamQuark&nbsp;
                            <span role="img" aria-label="unicorn">
                                🦄
                            </span>
                        </Link>
                    </TopAppBarTitle>
                </TopAppBarSection>
            </TopAppBarRow>
        </TopAppBar>
    );
}
