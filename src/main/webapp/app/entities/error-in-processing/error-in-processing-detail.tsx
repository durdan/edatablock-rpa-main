import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './error-in-processing.reducer';
import { IErrorInProcessing } from 'app/shared/model/error-in-processing.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IErrorInProcessingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ErrorInProcessingDetail extends React.Component<IErrorInProcessingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { errorInProcessingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ErrorInProcessing [<b>{errorInProcessingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="errorCode">Error Code</span>
            </dt>
            <dd>{errorInProcessingEntity.errorCode}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{errorInProcessingEntity.description}</dd>
            <dt>
              <span id="processType">Process Type</span>
            </dt>
            <dd>{errorInProcessingEntity.processType}</dd>
            <dt>
              <span id="createDate">Create Date</span>
            </dt>
            <dd>
              <TextFormat value={errorInProcessingEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="exception">Exception</span>
            </dt>
            <dd>{errorInProcessingEntity.exception}</dd>
            <dt>
              <span id="processBy">Process By</span>
            </dt>
            <dd>{errorInProcessingEntity.processBy}</dd>
            <dt>
              <span id="processID">Process ID</span>
            </dt>
            <dd>{errorInProcessingEntity.processID}</dd>
          </dl>
          <Button tag={Link} to="/entity/error-in-processing" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/error-in-processing/${errorInProcessingEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ errorInProcessing }: IRootState) => ({
  errorInProcessingEntity: errorInProcessing.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorInProcessingDetail);
