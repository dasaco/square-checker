import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';

ReactDOM.render(

	<div>
	{Router}
	</div>,

	document.getElementById('app-mount-point')
);
