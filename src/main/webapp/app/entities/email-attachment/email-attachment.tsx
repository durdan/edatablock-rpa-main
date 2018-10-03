import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './email-attachment.reducer';
import { IEmailAttachment } from 'app/shared/model/email-attachment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IEmailAttachmentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEmailAttachmentState = IPaginationBaseState;

export class EmailAttachment extends React.Component<IEmailAttachmentProps, IEmailAttachmentState> {
  state: IEmailAttachmentState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { emailAttachmentList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="email-attachment-heading">
          Email Attachments
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Email Attachment
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('messageId')}>
                  Message Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('clientEmailAddress')}>
                  Client Email Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fileName')}>
                  File Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fileExtension')}>
                  File Extension <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fileLocation')}>
                  File Location <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Email Messages <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {emailAttachmentList.map((emailAttachment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${emailAttachment.id}`} color="link" size="sm">
                      {emailAttachment.id}
                    </Button>
                  </td>
                  <td>{emailAttachment.messageId}</td>
                  <td>{emailAttachment.clientEmailAddress}</td>
                  <td>{emailAttachment.fileName}</td>
                  <td>{emailAttachment.fileExtension}</td>
                  <td>{emailAttachment.fileLocation}</td>
                  <td>
                    {emailAttachment.emailMessagesMessageId ? (
                      <Link to={`email-messages/${emailAttachment.emailMessagesId}`}>{emailAttachment.emailMessagesMessageId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${emailAttachment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${emailAttachment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${emailAttachment.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ emailAttachment }: IRootState) => ({
  emailAttachmentList: emailAttachment.entities,
  totalItems: emailAttachment.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAttachment);
