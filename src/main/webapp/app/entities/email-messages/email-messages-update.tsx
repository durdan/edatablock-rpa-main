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
import { getEntity, updateEntity, createEntity, reset } from './email-messages.reducer';
import { IEmailMessages } from 'app/shared/model/email-messages.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmailMessagesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmailMessagesUpdateState {
  isNew: boolean;
  clientId: string;
}

export class EmailMessagesUpdate extends React.Component<IEmailMessagesUpdateProps, IEmailMessagesUpdateState> {
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
    values.receivedTime = new Date(values.receivedTime);

    if (errors.length === 0) {
      const { emailMessagesEntity } = this.props;
      const entity = {
        ...emailMessagesEntity,
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
    this.props.history.push('/entity/email-messages');
  };

  render() {
    const { emailMessagesEntity, clients, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="edatablockrpamainApp.emailMessages.home.createOrEditLabel">Create or edit a EmailMessages</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : emailMessagesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="email-messages-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="messageIdLabel" for="messageId">
                    Message Id
                  </Label>
                  <AvField
                    id="email-messages-messageId"
                    type="text"
                    name="messageId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailSubjectLabel" for="emailSubject">
                    Email Subject
                  </Label>
                  <AvField
                    id="email-messages-emailSubject"
                    type="text"
                    name="emailSubject"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailBodyLabel" for="emailBody">
                    Email Body
                  </Label>
                  <AvField id="email-messages-emailBody" type="text" name="emailBody" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    Status
                  </Label>
                  <AvField id="email-messages-status" type="text" name="status" />
                </AvGroup>
                <AvGroup>
                  <Label id="clientEmailAddressLabel" for="clientEmailAddress">
                    Client Email Address
                  </Label>
                  <AvField id="email-messages-clientEmailAddress" type="text" name="clientEmailAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="receiveFromLabel" for="receiveFrom">
                    Receive From
                  </Label>
                  <AvField
                    id="email-messages-receiveFrom"
                    type="text"
                    name="receiveFrom"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="receivedTimeLabel" for="receivedTime">
                    Received Time
                  </Label>
                  <AvInput
                    id="email-messages-receivedTime"
                    type="datetime-local"
                    className="form-control"
                    name="receivedTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.emailMessagesEntity.receivedTime)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numberOfAttachmentsLabel" for="numberOfAttachments">
                    Number Of Attachments
                  </Label>
                  <AvField
                    id="email-messages-numberOfAttachments"
                    type="string"
                    className="form-control"
                    name="numberOfAttachments"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="attachmentsLabel" for="attachments">
                    Attachments
                  </Label>
                  <AvField
                    id="email-messages-attachments"
                    type="text"
                    name="attachments"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="client.clientEmailAddress">Client</Label>
                  <AvInput id="email-messages-client" type="select" className="form-control" name="clientId">
                    <option value="" key="0" />
                    {clients
                      ? clients.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.clientEmailAddress}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/email-messages" replace color="info">
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
  emailMessagesEntity: storeState.emailMessages.entity,
  loading: storeState.emailMessages.loading,
  updating: storeState.emailMessages.updating
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
)(EmailMessagesUpdate);
