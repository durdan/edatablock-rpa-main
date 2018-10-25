import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './template-rules.reducer';
import { ITemplateRules } from 'app/shared/model/template-rules.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITemplateRulesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITemplateRulesState = IPaginationBaseState;

export class TemplateRules extends React.Component<ITemplateRulesProps, ITemplateRulesState> {
  state: ITemplateRulesState = {
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
    const { templateRulesList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="template-rules-heading">
          Template Rules
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Template Rules
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('ruleSequence')}>
                  Rule Sequence <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('lookupPlace')}>
                  Lookup Place <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('operator')}>
                  Operator <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('value')}>
                  Value <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('joinField')}>
                  Join Field <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Input Template <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Client <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {templateRulesList.map((templateRules, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${templateRules.id}`} color="link" size="sm">
                      {templateRules.id}
                    </Button>
                  </td>
                  <td>{templateRules.ruleSequence}</td>
                  <td>{templateRules.lookupPlace}</td>
                  <td>{templateRules.operator}</td>
                  <td>{templateRules.value}</td>
                  <td>{templateRules.joinField}</td>
                  <td>{templateRules.description}</td>
                  <td>
                    {templateRules.inputTemplateTemplateName ? (
                      <Link to={`input-template/${templateRules.inputTemplateId}`}>{templateRules.inputTemplateTemplateName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {templateRules.clientClientName ? (
                      <Link to={`client/${templateRules.clientId}`}>{templateRules.clientClientName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${templateRules.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${templateRules.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${templateRules.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ templateRules }: IRootState) => ({
  templateRulesList: templateRules.entities,
  totalItems: templateRules.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateRules);
