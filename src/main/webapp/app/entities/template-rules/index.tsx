import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TemplateRules from './template-rules';
import TemplateRulesDetail from './template-rules-detail';
import TemplateRulesUpdate from './template-rules-update';
import TemplateRulesDeleteDialog from './template-rules-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TemplateRulesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TemplateRulesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TemplateRulesDetail} />
      <ErrorBoundaryRoute path={match.url} component={TemplateRules} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TemplateRulesDeleteDialog} />
  </>
);

export default Routes;
