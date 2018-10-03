import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './error-in-processing.reducer';
import { IErrorInProcessing } from 'app/shared/model/error-in-processing.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IErrorInProcessingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IErrorInProcessingUpdateState {
  isNew: boolean;
}

export class ErrorInProcessingUpdate extends React.Component<IErrorInProcessingUpdateProps, IErrorInProcessingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.createDate = new Date(values.createDate);

    if (errors.length === 0) {
      const { errorInProcessingEntity } = this.props;
      const entity = {
        ...errorInProcessingEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/error-in-processing');
  };

  render() {
    const { errorInProcessingEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="edatablockrpamainApp.errorInProcessing.home.createOrEditLabel">Create or edit a ErrorInProcessing</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : errorInProcessingEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="error-in-processing-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="errorCodeLabel" for="errorCode">
                    Error Code
                  </Label>
                  <AvField id="error-in-processing-errorCode" type="text" name="errorCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    Description
                  </Label>
                  <AvField id="error-in-processing-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="processTypeLabel" for="processType">
                    Process Type
                  </Label>
                  <AvField id="error-in-processing-processType" type="text" name="processType" />
                </AvGroup>
                <AvGroup>
                  <Label id="createDateLabel" for="createDate">
                    Create Date
                  </Label>
                  <AvInput
                    id="error-in-processing-createDate"
                    type="datetime-local"
                    className="form-control"
                    name="createDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.errorInProcessingEntity.createDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="exceptionLabel" for="exception">
                    Exception
                  </Label>
                  <AvField id="error-in-processing-exception" type="text" name="exception" />
                </AvGroup>
                <AvGroup>
                  <Label id="processByLabel" for="processBy">
                    Process By
                  </Label>
                  <AvField id="error-in-processing-processBy" type="text" name="processBy" />
                </AvGroup>
                <AvGroup>
                  <Label id="processIDLabel" for="processID">
                    Process ID
                  </Label>
                  <AvField id="error-in-processing-processID" type="string" className="form-control" name="processID" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/error-in-processing" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  errorInProcessingEntity: storeState.errorInProcessing.entity,
  loading: storeState.errorInProcessing.loading,
  updating: storeState.errorInProcessing.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorInProcessingUpdate);
