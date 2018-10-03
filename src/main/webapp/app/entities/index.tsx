import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Organization from './organization';
import OrgEmailConfig from './org-email-config';
import Client from './client';
import ClientEmailDomain from './client-email-domain';
import InputTemplate from './input-template';
import TemplateFields from './template-fields';
import EmailMessages from './email-messages';
import EmailAttachment from './email-attachment';
import UploadFiles from './upload-files';
import Transaction from './transaction';
import ErrorInProcessing from './error-in-processing';
import ClientDataOcr from './client-data-ocr';
import FileToFtp from './file-to-ftp';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/organization`} component={Organization} />
      <ErrorBoundaryRoute path={`${match.url}/org-email-config`} component={OrgEmailConfig} />
      <ErrorBoundaryRoute path={`${match.url}/client`} component={Client} />
      <ErrorBoundaryRoute path={`${match.url}/client-email-domain`} component={ClientEmailDomain} />
      <ErrorBoundaryRoute path={`${match.url}/input-template`} component={InputTemplate} />
      <ErrorBoundaryRoute path={`${match.url}/template-fields`} component={TemplateFields} />
      <ErrorBoundaryRoute path={`${match.url}/email-messages`} component={EmailMessages} />
      <ErrorBoundaryRoute path={`${match.url}/email-attachment`} component={EmailAttachment} />
      <ErrorBoundaryRoute path={`${match.url}/upload-files`} component={UploadFiles} />
      <ErrorBoundaryRoute path={`${match.url}/transaction`} component={Transaction} />
      <ErrorBoundaryRoute path={`${match.url}/error-in-processing`} component={ErrorInProcessing} />
      <ErrorBoundaryRoute path={`${match.url}/client-data-ocr`} component={ClientDataOcr} />
      <ErrorBoundaryRoute path={`${match.url}/file-to-ftp`} component={FileToFtp} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
