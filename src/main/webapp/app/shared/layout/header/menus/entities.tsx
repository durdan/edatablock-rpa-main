import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/organization">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Organization
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/org-email-config">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Org Email Config
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/client">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Client
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/client-email-domain">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Client Email Domain
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/input-template">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Input Template
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/template-fields">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Template Fields
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/email-messages">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Email Messages
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/email-attachment">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Email Attachment
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/upload-files">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Upload Files
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/transaction">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Transaction
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/error-in-processing">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Error In Processing
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/client-data-ocr">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Client Data Ocr
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/file-to-ftp">
      <FontAwesomeIcon icon="asterisk" />&nbsp;File To Ftp
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
