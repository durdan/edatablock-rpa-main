import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './template-fields.reducer';
import { ITemplateFields } from 'app/shared/model/template-fields.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITemplateFieldsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITemplateFieldsState = IPaginationBaseState;

export class TemplateFields extends React.Component<ITemplateFieldsProps, ITemplateFieldsState> {
  state: ITemplateFieldsState = {
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
    const { templateFieldsList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="template-fields-heading">
          Template Fields
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Template Fields
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fieldName')}>
                  Field Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fieldZoneMinX')}>
                  Field Zone Min X <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fieldZoneMinY')}>
                  Field Zone Min Y <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fieldZoneMaxX')}>
                  Field Zone Max X <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fieldZoneMaxY')}>
                  Field Zone Max Y <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('width')}>
                  Width <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('height')}>
                  Height <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('sequence')}>
                  Sequence <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('isTemplateIdentifier')}>
                  Is Template Identifier <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('isLabel')}>
                  Is Label <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('pageNumebr')}>
                  Page Numebr <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fieldValidationRequire')}>
                  Field Validation Require <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fieldValidationRule')}>
                  Field Validation Rule <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Input Template <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {templateFieldsList.map((templateFields, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${templateFields.id}`} color="link" size="sm">
                      {templateFields.id}
                    </Button>
                  </td>
                  <td>{templateFields.fieldName}</td>
                  <td>{templateFields.fieldZoneMinX}</td>
                  <td>{templateFields.fieldZoneMinY}</td>
                  <td>{templateFields.fieldZoneMaxX}</td>
                  <td>{templateFields.fieldZoneMaxY}</td>
                  <td>{templateFields.width}</td>
                  <td>{templateFields.height}</td>
                  <td>{templateFields.sequence}</td>
                  <td>{templateFields.isTemplateIdentifier}</td>
                  <td>{templateFields.isLabel}</td>
                  <td>{templateFields.pageNumebr}</td>
                  <td>{templateFields.fieldValidationRequire}</td>
                  <td>{templateFields.fieldValidationRule}</td>
                  <td>
                    {templateFields.inputTemplateTemplateName ? (
                      <Link to={`input-template/${templateFields.inputTemplateId}`}>{templateFields.inputTemplateTemplateName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${templateFields.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${templateFields.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${templateFields.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ templateFields }: IRootState) => ({
  templateFieldsList: templateFields.entities,
  totalItems: templateFields.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateFields);
