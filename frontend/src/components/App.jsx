import '../scss/styles.scss'
import Swal from 'sweetalert2'
import ClientMonitor from 'skywalking-client-js';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Transition, CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import SplitScreen from './SplitScreen.tsx';

export default function App(){
    return(
        <SplitScreen/>
    )
}