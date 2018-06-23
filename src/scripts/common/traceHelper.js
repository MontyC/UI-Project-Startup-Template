import Constants from './constants';

export default class TraceHelper {
	constructor() {
		this.getStatus();
	}

	getStatus = () => {
		window.setTimeout(() => {
			if (this.canLog()) {
				if (this.isEnabled())
					console.log(`NOTE: Trace is currently enabled, use the command new ${Constants.client}.TraceHelper().disable() if you want to disable it.`);
				else
					console.log(`NOTE: Trace is currently disabled, use the command new ${Constants.client}.TraceHelper().enable() if you want to enable it.`);
			}
		}, 100);
	}

	canLog = () => typeof console != 'undefined' && typeof console.log != 'undefined';

	isEnabled = () => localStorage && localStorage['trace-enabled'] == 'true';

	enable = () => (localStorage['trace-enabled'] = true);

	disable = () => (localStorage['trace-enabled'] = false);

	write = msg => {
		if (this.canLog() && this.isEnabled()) {
			if (typeof msg == 'string') {
				console.log(`TRACE > ${msg}`);
			} else {
				console.log('TRACE >');
				console.log(msg);
			}
		}
	};
}
