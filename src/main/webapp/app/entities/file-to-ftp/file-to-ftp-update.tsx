import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClientDataOcr } from 'app/shared/model/client-data-ocr.model';
import { getEntities as getClientDataOcrs } from 'app/entities/client-data-ocr/client-data-ocr.reducer';
import { getEntity, updateEntity, createEntity, reset } from './file-to-ftp.reducer';
import { IFileToFtp } from 'app/shared/model/file-to-ftp.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileToFtpUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFileToFtpUpdateState {
  isNew: boolean;
  clientDataOcrId: string;
}

export class FileToFtpUpdate extends React.Component<IFileToFtpUpdateProps, IFileToFtpUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      clientDataOcrId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getClientDataOcrs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { fileToFtpEntity } = this.props;
      const entity = {
        ...fileToFtpEntity,
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
    this.props.history.push('/entity/file-to-ftp');
  };

  render() {
    const { fileToFtpEntity, clientDataOcrs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="edatablockrpamainApp.fileToFtp.home.createOrEditLabel">Create or edit a FileToFtp</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fileToFtpEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="file-to-ftp-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="messageIdLabel" for="messageId">
                    Message Id
                  </Label>
                  <AvField id="file-to-ftp-messageId" type="text" name="messageId" />
                </AvGroup>
                <AvGroup>
                  <Label id="clientEmailAddressLabel" for="clientEmailAddress">
                    Client Email Address
                  </Label>
                  <AvField id="file-to-ftp-clientEmailAddress" type="text" name="clientEmailAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    Status
                  </Label>
                  <AvField id="file-to-ftp-status" type="text" name="status" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileNameLabel" for="fileName">
                    File Name
                  </Label>
                  <AvField id="file-to-ftp-fileName" type="text" name="fileName" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileTypeLabel" for="fileType">
                    File Type
                  </Label>
                  <AvField id="file-to-ftp-fileType" type="text" name="fileType" />
                </AvGroup>
                <AvGroup>
                  <Label for="clientDataOcr.clientEmailAddress">Client Data Ocr</Label>
                  <AvInput id="file-to-ftp-clientDataOcr" type="select" className="form-control" name="clientDataOcrId">
                    <option value="" key="0" />
                    {clientDataOcrs
                      ? clientDataOcrs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.clientEmailAddress}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/file-to-ftp" replace color="info">
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
  clientDataOcrs: storeState.clientDataOcr.entities,
  fileToFtpEntity: storeState.fileToFtp.entity,
  loading: storeState.fileToFtp.loading,
  updating: storeState.fileToFtp.updating
});

const mapDispatchToProps = {
  getClientDataOcrs,
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
)(FileToFtpUpdate);
