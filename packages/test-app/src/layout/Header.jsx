import React from "react";

import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from "@rmwc/top-app-bar";

export const Header = () => (
    <TopAppBar>
        <TopAppBarRow>
            <TopAppBarSection>
                <TopAppBarTitle>
                    Technical test DQ{" "}
                    <span role="img" aria-label="unicorn">
                        🦄
                    </span>
                </TopAppBarTitle>
            </TopAppBarSection>
        </TopAppBarRow>
    </TopAppBar>
);
