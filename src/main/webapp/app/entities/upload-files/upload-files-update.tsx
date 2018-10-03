import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { getEntity, updateEntity, createEntity, reset } from './upload-files.reducer';
import { IUploadFiles } from 'app/shared/model/upload-files.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUploadFilesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUploadFilesUpdateState {
  isNew: boolean;
  clientId: string;
}

export class UploadFilesUpdate extends React.Component<IUploadFilesUpdateProps, IUploadFilesUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getClients();
  }

  saveEntity = (event, errors, values) => {
    values.uploadDateTime = new Date(values.uploadDateTime);

    if (errors.length === 0) {
      const { uploadFilesEntity } = this.props;
      const entity = {
        ...uploadFilesEntity,
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
    this.props.history.push('/entity/upload-files');
  };

  render() {
    const { uploadFilesEntity, clients, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="edatablockrpamainApp.uploadFiles.home.createOrEditLabel">Create or edit a UploadFiles</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : uploadFilesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="upload-files-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="clientEmailAddressLabel" for="clientEmailAddress">
                    Client Email Address
                  </Label>
                  <AvField id="upload-files-clientEmailAddress" type="text" name="clientEmailAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileNameLabel" for="fileName">
                    File Name
                  </Label>
                  <AvField
                    id="upload-files-fileName"
                    type="text"
                    name="fileName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fileExtensionLabel" for="fileExtension">
                    File Extension
                  </Label>
                  <AvField
                    id="upload-files-fileExtension"
                    type="text"
                    name="fileExtension"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="uploadByLabel" for="uploadBy">
                    Upload By
                  </Label>
                  <AvField id="upload-files-uploadBy" type="text" name="uploadBy" />
                </AvGroup>
                <AvGroup>
                  <Label id="uploadDateTimeLabel" for="uploadDateTime">
                    Upload Date Time
                  </Label>
                  <AvInput
                    id="upload-files-uploadDateTime"
                    type="datetime-local"
                    className="form-control"
                    name="uploadDateTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.uploadFilesEntity.uploadDateTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="uploadLocationLabel" for="uploadLocation">
                    Upload Location
                  </Label>
                  <AvField id="upload-files-uploadLocation" type="text" name="uploadLocation" />
                </AvGroup>
                <AvGroup>
                  <Label for="client.clientName">Client</Label>
                  <AvInput id="upload-files-client" type="select" className="form-control" name="clientId">
                    <option value="" key="0" />
                    {clients
                      ? clients.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.clientName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/upload-files" replace color="info">
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
  clients: storeState.client.entities,
  uploadFilesEntity: storeState.uploadFiles.entity,
  loading: storeState.uploadFiles.loading,
  updating: storeState.uploadFiles.updating
});

const mapDispatchToProps = {
  getClients,
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
)(UploadFilesUpdate);
