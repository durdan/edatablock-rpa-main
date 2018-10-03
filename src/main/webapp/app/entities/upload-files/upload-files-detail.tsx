import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './upload-files.reducer';
import { IUploadFiles } from 'app/shared/model/upload-files.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUploadFilesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UploadFilesDetail extends React.Component<IUploadFilesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { uploadFilesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            UploadFiles [<b>{uploadFilesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="clientEmailAddress">Client Email Address</span>
            </dt>
            <dd>{uploadFilesEntity.clientEmailAddress}</dd>
            <dt>
              <span id="fileName">File Name</span>
            </dt>
            <dd>{uploadFilesEntity.fileName}</dd>
            <dt>
              <span id="fileExtension">File Extension</span>
            </dt>
            <dd>{uploadFilesEntity.fileExtension}</dd>
            <dt>
              <span id="uploadBy">Upload By</span>
            </dt>
            <dd>{uploadFilesEntity.uploadBy}</dd>
            <dt>
              <span id="uploadDateTime">Upload Date Time</span>
            </dt>
            <dd>
              <TextFormat value={uploadFilesEntity.uploadDateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="uploadLocation">Upload Location</span>
            </dt>
            <dd>{uploadFilesEntity.uploadLocation}</dd>
            <dt>Client</dt>
            <dd>{uploadFilesEntity.clientClientName ? uploadFilesEntity.clientClientName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/upload-files" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/upload-files/${uploadFilesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ uploadFiles }: IRootState) => ({
  uploadFilesEntity: uploadFiles.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFilesDetail);
