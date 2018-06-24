
import React from 'react';
import ReactDOM from 'react-dom';

import { 
  
    
} from '../components';


export default class LocationChecker {
    constructor() {
        this.initialiseGlobals();
        this.checkLocation();
    }

    initialiseGlobals = () => {


        // Responsive Background Images
        let elements = document.querySelectorAll('[data-responsive-background-image]'); 
        if (elements.length > 0)
            (Array.from(elements)).forEach(element => new ResponsiveBackgroundImage(element));
    }

    checkLocation = () => {

     
    }
}