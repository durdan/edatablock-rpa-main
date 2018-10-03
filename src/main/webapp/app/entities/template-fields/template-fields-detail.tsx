import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './template-fields.reducer';
import { ITemplateFields } from 'app/shared/model/template-fields.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITemplateFieldsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TemplateFieldsDetail extends React.Component<ITemplateFieldsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { templateFieldsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            TemplateFields [<b>{templateFieldsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="fieldName">Field Name</span>
            </dt>
            <dd>{templateFieldsEntity.fieldName}</dd>
            <dt>
              <span id="fieldZoneMinX">Field Zone Min X</span>
            </dt>
            <dd>{templateFieldsEntity.fieldZoneMinX}</dd>
            <dt>
              <span id="fieldZoneMinY">Field Zone Min Y</span>
            </dt>
            <dd>{templateFieldsEntity.fieldZoneMinY}</dd>
            <dt>
              <span id="fieldZoneMaxX">Field Zone Max X</span>
            </dt>
            <dd>{templateFieldsEntity.fieldZoneMaxX}</dd>
            <dt>
              <span id="fieldZoneMaxY">Field Zone Max Y</span>
            </dt>
            <dd>{templateFieldsEntity.fieldZoneMaxY}</dd>
            <dt>
              <span id="width">Width</span>
            </dt>
            <dd>{templateFieldsEntity.width}</dd>
            <dt>
              <span id="height">Height</span>
            </dt>
            <dd>{templateFieldsEntity.height}</dd>
            <dt>
              <span id="sequence">Sequence</span>
            </dt>
            <dd>{templateFieldsEntity.sequence}</dd>
            <dt>
              <span id="isTemplateIdentifier">Is Template Identifier</span>
            </dt>
            <dd>{templateFieldsEntity.isTemplateIdentifier}</dd>
            <dt>
              <span id="fieldValidationRequire">Field Validation Require</span>
            </dt>
            <dd>{templateFieldsEntity.fieldValidationRequire}</dd>
            <dt>
              <span id="fieldValidationRule">Field Validation Rule</span>
            </dt>
            <dd>{templateFieldsEntity.fieldValidationRule}</dd>
            <dt>Input Template</dt>
            <dd>{templateFieldsEntity.inputTemplateTemplateName ? templateFieldsEntity.inputTemplateTemplateName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/template-fields" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/template-fields/${templateFieldsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ templateFields }: IRootState) => ({
  templateFieldsEntity: templateFields.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateFieldsDetail);
