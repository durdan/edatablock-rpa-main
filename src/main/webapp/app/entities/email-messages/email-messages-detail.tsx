import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './email-messages.reducer';
import { IEmailMessages } from 'app/shared/model/email-messages.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmailMessagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmailMessagesDetail extends React.Component<IEmailMessagesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { emailMessagesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            EmailMessages [<b>{emailMessagesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="messageId">Message Id</span>
            </dt>
            <dd>{emailMessagesEntity.messageId}</dd>
            <dt>
              <span id="emailSubject">Email Subject</span>
            </dt>
            <dd>{emailMessagesEntity.emailSubject}</dd>
            <dt>
              <span id="emailBody">Email Body</span>
            </dt>
            <dd>{emailMessagesEntity.emailBody}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{emailMessagesEntity.status}</dd>
            <dt>
              <span id="clientEmailAddress">Client Email Address</span>
            </dt>
            <dd>{emailMessagesEntity.clientEmailAddress}</dd>
            <dt>
              <span id="receiveFrom">Receive From</span>
            </dt>
            <dd>{emailMessagesEntity.receiveFrom}</dd>
            <dt>
              <span id="receivedTime">Received Time</span>
            </dt>
            <dd>
              <TextFormat value={emailMessagesEntity.receivedTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="numberOfAttachments">Number Of Attachments</span>
            </dt>
            <dd>{emailMessagesEntity.numberOfAttachments}</dd>
            <dt>
              <span id="attachments">Attachments</span>
            </dt>
            <dd>{emailMessagesEntity.attachments}</dd>
            <dt>Client</dt>
            <dd>{emailMessagesEntity.clientClientEmailAddress ? emailMessagesEntity.clientClientEmailAddress : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/email-messages" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/email-messages/${emailMessagesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ emailMessages }: IRootState) => ({
  emailMessagesEntity: emailMessages.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailMessagesDetail);
