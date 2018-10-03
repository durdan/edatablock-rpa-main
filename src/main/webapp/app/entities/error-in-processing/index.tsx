import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ErrorInProcessing from './error-in-processing';
import ErrorInProcessingDetail from './error-in-processing-detail';
import ErrorInProcessingUpdate from './error-in-processing-update';
import ErrorInProcessingDeleteDialog from './error-in-processing-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ErrorInProcessingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ErrorInProcessingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ErrorInProcessingDetail} />
      <ErrorBoundaryRoute path={match.url} component={ErrorInProcessing} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ErrorInProcessingDeleteDialog} />
  </>
);

export default Routes;
