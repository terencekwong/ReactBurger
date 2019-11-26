import React from 'react';

import Auxs from '../../hoc/Auxs';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Auxs>
        <Toolbar />
        <main className={classes.Content}>
            { props.children }
        </main>
    </Auxs>
);

export default layout;