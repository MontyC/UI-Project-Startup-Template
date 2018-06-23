import $ from 'jquery';

import { TraceHelper, LocationChecker, Constants } from './common';

import '../styles/main.scss';

export { TraceHelper };

$(() => {
	new TraceHelper();
	new LocationChecker();
});
