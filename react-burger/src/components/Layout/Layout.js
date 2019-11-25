import React from 'react';

import Auxs from '../../hoc/Auxs';
import classes from './Layout.css';

const layout = (props) => (
    <Auxs>
        <div>TooBar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            { props.children }
        </main>
    </Auxs>
);

export default layout;