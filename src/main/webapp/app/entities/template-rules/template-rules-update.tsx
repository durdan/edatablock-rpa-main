import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInputTemplate } from 'app/shared/model/input-template.model';
import { getEntities as getInputTemplates } from 'app/entities/input-template/input-template.reducer';
import { getEntity, updateEntity, createEntity, reset } from './template-rules.reducer';
import { ITemplateRules } from 'app/shared/model/template-rules.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITemplateRulesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITemplateRulesUpdateState {
  isNew: boolean;
  inputTemplateId: string;
}

export class TemplateRulesUpdate extends React.Component<ITemplateRulesUpdateProps, ITemplateRulesUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      inputTemplateId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getInputTemplates();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { templateRulesEntity } = this.props;
      const entity = {
        ...templateRulesEntity,
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
    this.props.history.push('/entity/template-rules');
  };

  render() {
    const { templateRulesEntity, inputTemplates, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="edatablockrpamainApp.templateRules.home.createOrEditLabel">Create or edit a TemplateRules</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : templateRulesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="template-rules-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="ruleSequenceLabel" for="ruleSequence">
                    Rule Sequence
                  </Label>
                  <AvField id="template-rules-ruleSequence" type="string" className="form-control" name="ruleSequence" />
                </AvGroup>
                <AvGroup>
                  <Label id="lookupPlaceLabel" for="lookupPlace">
                    Lookup Place
                  </Label>
                  <AvField id="template-rules-lookupPlace" type="text" name="lookupPlace" />
                </AvGroup>
                <AvGroup>
                  <Label id="operatorLabel" for="operator">
                    Operator
                  </Label>
                  <AvField id="template-rules-operator" type="text" name="operator" />
                </AvGroup>
                <AvGroup>
                  <Label id="valueLabel" for="value">
                    Value
                  </Label>
                  <AvField id="template-rules-value" type="text" name="value" />
                </AvGroup>
                <AvGroup>
                  <Label id="joinFieldLabel" for="joinField">
                    Join Field
                  </Label>
                  <AvField id="template-rules-joinField" type="text" name="joinField" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    Description
                  </Label>
                  <AvField id="template-rules-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="inputTemplate.templateName">Input Template</Label>
                  <AvInput id="template-rules-inputTemplate" type="select" className="form-control" name="inputTemplateId">
                    <option value="" key="0" />
                    {inputTemplates
                      ? inputTemplates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.templateName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/template-rules" replace color="info">
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
  inputTemplates: storeState.inputTemplate.entities,
  templateRulesEntity: storeState.templateRules.entity,
  loading: storeState.templateRules.loading,
  updating: storeState.templateRules.updating
});

const mapDispatchToProps = {
  getInputTemplates,
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
)(TemplateRulesUpdate);
