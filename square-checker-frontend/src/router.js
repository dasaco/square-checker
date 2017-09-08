import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Shell from 'components/layout/shell/shell';
import Frontpage from 'views/frontpage/frontpage';

const ApplicationRouter = (

	<Router history={browserHistory}>
		<Route component={Shell}>

			<Route path="/" component={Frontpage} />

		</Route>
	</Router>

);

export default ApplicationRouter;
