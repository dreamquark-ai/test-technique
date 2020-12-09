// Libs
import React from "react";

// Components
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from "@rmwc/top-app-bar";

export function Header() {
    return (
        <TopAppBar>
            <TopAppBarRow>
                <TopAppBarSection>
                    <TopAppBarTitle>
                        TechnicalTest DreamQuark{" "}
                        <span role="img" aria-label="unicorn">
                            🦄
                        </span>
                    </TopAppBarTitle>
                </TopAppBarSection>
            </TopAppBarRow>
        </TopAppBar>
    );
}
