import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './client-email-domain.reducer';
import { IClientEmailDomain } from 'app/shared/model/client-email-domain.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientEmailDomainDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClientEmailDomainDetail extends React.Component<IClientEmailDomainDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clientEmailDomainEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ClientEmailDomain [<b>{clientEmailDomainEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="emailDomain">Email Domain</span>
            </dt>
            <dd>{clientEmailDomainEntity.emailDomain}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{clientEmailDomainEntity.description}</dd>
            <dt>
              <span id="isActive">Is Active</span>
            </dt>
            <dd>{clientEmailDomainEntity.isActive}</dd>
            <dt>Client</dt>
            <dd>{clientEmailDomainEntity.clientClientName ? clientEmailDomainEntity.clientClientName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/client-email-domain" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/client-email-domain/${clientEmailDomainEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ clientEmailDomain }: IRootState) => ({
  clientEmailDomainEntity: clientEmailDomain.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientEmailDomainDetail);
