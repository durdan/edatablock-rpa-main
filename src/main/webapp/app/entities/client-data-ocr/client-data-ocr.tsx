import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './client-data-ocr.reducer';
import { IClientDataOcr } from 'app/shared/model/client-data-ocr.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IClientDataOcrProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IClientDataOcrState = IPaginationBaseState;

export class ClientDataOcr extends React.Component<IClientDataOcrProps, IClientDataOcrState> {
  state: IClientDataOcrState = {
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
    const { clientDataOcrList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="client-data-ocr-heading">
          Client Data Ocrs
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Client Data Ocr
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('emailMessageId')}>
                  Email Message Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('extractOcrDataJson')}>
                  Extract Ocr Data Json <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('searchId')}>
                  Search Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('clientEmailAddress')}>
                  Client Email Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('attachmentfileName')}>
                  Attachmentfile Name <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Input Template <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Transaction <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clientDataOcrList.map((clientDataOcr, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${clientDataOcr.id}`} color="link" size="sm">
                      {clientDataOcr.id}
                    </Button>
                  </td>
                  <td>{clientDataOcr.emailMessageId}</td>
                  <td>{clientDataOcr.extractOcrDataJson}</td>
                  <td>{clientDataOcr.searchId}</td>
                  <td>{clientDataOcr.clientEmailAddress}</td>
                  <td>{clientDataOcr.attachmentfileName}</td>
                  <td>
                    {clientDataOcr.inputTemplateTemplateName ? (
                      <Link to={`input-template/${clientDataOcr.inputTemplateId}`}>{clientDataOcr.inputTemplateTemplateName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {clientDataOcr.transactionId ? (
                      <Link to={`transaction/${clientDataOcr.transactionId}`}>{clientDataOcr.transactionId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${clientDataOcr.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${clientDataOcr.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${clientDataOcr.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ clientDataOcr }: IRootState) => ({
  clientDataOcrList: clientDataOcr.entities,
  totalItems: clientDataOcr.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientDataOcr);
