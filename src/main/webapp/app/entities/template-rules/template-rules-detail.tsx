import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './template-rules.reducer';
import { ITemplateRules } from 'app/shared/model/template-rules.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITemplateRulesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TemplateRulesDetail extends React.Component<ITemplateRulesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { templateRulesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            TemplateRules [<b>{templateRulesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="ruleSequence">Rule Sequence</span>
            </dt>
            <dd>{templateRulesEntity.ruleSequence}</dd>
            <dt>
              <span id="lookupPlace">Lookup Place</span>
            </dt>
            <dd>{templateRulesEntity.lookupPlace}</dd>
            <dt>
              <span id="operator">Operator</span>
            </dt>
            <dd>{templateRulesEntity.operator}</dd>
            <dt>
              <span id="value">Value</span>
            </dt>
            <dd>{templateRulesEntity.value}</dd>
            <dt>
              <span id="joinField">Join Field</span>
            </dt>
            <dd>{templateRulesEntity.joinField}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{templateRulesEntity.description}</dd>
            <dt>Input Template</dt>
            <dd>{templateRulesEntity.inputTemplateTemplateName ? templateRulesEntity.inputTemplateTemplateName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/template-rules" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/template-rules/${templateRulesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ templateRules }: IRootState) => ({
  templateRulesEntity: templateRules.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateRulesDetail);
