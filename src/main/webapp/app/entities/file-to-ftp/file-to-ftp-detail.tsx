import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file-to-ftp.reducer';
import { IFileToFtp } from 'app/shared/model/file-to-ftp.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileToFtpDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FileToFtpDetail extends React.Component<IFileToFtpDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fileToFtpEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            FileToFtp [<b>{fileToFtpEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="messageId">Message Id</span>
            </dt>
            <dd>{fileToFtpEntity.messageId}</dd>
            <dt>
              <span id="clientEmailAddress">Client Email Address</span>
            </dt>
            <dd>{fileToFtpEntity.clientEmailAddress}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{fileToFtpEntity.status}</dd>
            <dt>
              <span id="fileName">File Name</span>
            </dt>
            <dd>{fileToFtpEntity.fileName}</dd>
            <dt>
              <span id="fileType">File Type</span>
            </dt>
            <dd>{fileToFtpEntity.fileType}</dd>
            <dt>Client Data Ocr</dt>
            <dd>{fileToFtpEntity.clientDataOcrClientEmailAddress ? fileToFtpEntity.clientDataOcrClientEmailAddress : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/file-to-ftp" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/file-to-ftp/${fileToFtpEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ fileToFtp }: IRootState) => ({
  fileToFtpEntity: fileToFtp.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileToFtpDetail);
