import React from "react";
import classnames from "classnames";
import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from "@rmwc/drawer";

export const SliderTitle = DrawerTitle;
export const SliderSubtitle = DrawerSubtitle;
export const SliderContent = DrawerContent;

export const SliderActions = ({ children }) => <div className="slider-actions">{children}</div>;

export const SliderHeader = ({ children }) => <DrawerHeader className="slider-header">{children}</DrawerHeader>;

export const Slider = ({ children, className, ...otherProps }) => {
    return (
        <Drawer className={classnames("slider", className)} {...otherProps}>
            {children}
        </Drawer>
    );
};
