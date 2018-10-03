import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './org-email-config.reducer';
import { IOrgEmailConfig } from 'app/shared/model/org-email-config.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrgEmailConfigDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class OrgEmailConfigDetail extends React.Component<IOrgEmailConfigDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { orgEmailConfigEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            OrgEmailConfig [<b>{orgEmailConfigEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="emailServerHost">Email Server Host</span>
            </dt>
            <dd>{orgEmailConfigEntity.emailServerHost}</dd>
            <dt>
              <span id="emailServerPort">Email Server Port</span>
            </dt>
            <dd>{orgEmailConfigEntity.emailServerPort}</dd>
            <dt>
              <span id="emailServerUserId">Email Server User Id</span>
            </dt>
            <dd>{orgEmailConfigEntity.emailServerUserId}</dd>
            <dt>
              <span id="emailServerPassword">Email Server Password</span>
            </dt>
            <dd>{orgEmailConfigEntity.emailServerPassword}</dd>
            <dt>
              <span id="createDate">Create Date</span>
            </dt>
            <dd>
              <TextFormat value={orgEmailConfigEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdBy">Created By</span>
            </dt>
            <dd>{orgEmailConfigEntity.createdBy}</dd>
            <dt>
              <span id="updateDate">Update Date</span>
            </dt>
            <dd>
              <TextFormat value={orgEmailConfigEntity.updateDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedBy">Updated By</span>
            </dt>
            <dd>{orgEmailConfigEntity.updatedBy}</dd>
            <dt>Org Name</dt>
            <dd>{orgEmailConfigEntity.orgNameOrgName ? orgEmailConfigEntity.orgNameOrgName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/org-email-config" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/org-email-config/${orgEmailConfigEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ orgEmailConfig }: IRootState) => ({
  orgEmailConfigEntity: orgEmailConfig.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgEmailConfigDetail);
