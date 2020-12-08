import React from "react";
import classnames from "classnames";
import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from "@rmwc/drawer";

export const SliderTitle = DrawerTitle;
export const SliderSubtitle = DrawerSubtitle;

export const SliderContent = ({ children, className, ...otherProps }) => (
    <DrawerContent className={classnames("c-slider__content", className)} {...otherProps}>
        {children}
    </DrawerContent>
);

export const SliderActions = ({ children }) => <div className="c-slider__actions">{children}</div>;

export const SliderHeader = ({ children }) => <DrawerHeader className="c-slider__header">{children}</DrawerHeader>;

export const Slider = ({ children, className, ...otherProps }) => {
    return (
        <Drawer className={classnames("c-slider", className)} {...otherProps}>
            {children}
        </Drawer>
    );
};
