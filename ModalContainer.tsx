import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IconButton,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';

import { mapActionsToProps } from '../../common/utils';

const DialogTitle = withStyles({
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10
  }
})(props => {
  const { classes, children, onClose } = props;
  return (
    <MuiDialogTitle id="modalTitle" disableTypography>
      <h1>{children}</h1>
      <IconButton
        data-test-id="close-modal"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

const ModalContainer = ({
  modal: {
    title,
    body,
    actions = [],
    show,
    showFooter,
    closeAction = () => null,
    closeLabel = 'Close'
  },
  closeModal
}) => {
  const close = () => {
    closeAction();
    closeModal();
  };

  return (
    <Dialog
      fullWidth
      data-test-id="modal-container"
      maxWidth="sm"
      open={show}
      onClose={close}
    >
      <DialogTitle data-test-id="modal-header" onClose={close}>
        {title}
      </DialogTitle>
      <DialogContent data-test-id="modal-content" color="error">
        {body}
      </DialogContent>
      {showFooter && (
        <DialogActions data-test-id="modal-actions">
          <button
            className="cancel"
            type="button"
            data-test-id="close-modal-action"
            id="closeModal"
            onClick={close}
          >
            {closeLabel}
          </button>
          {actions &&
            actions.map(
              ({ callback, buttonClassName = 'primary', label, key }) => (
                <button
                  className={buttonClassName}
                  data-test-id={`${buttonClassName}-action`}
                  id={key}
                  key={key}
                  type="button"
                  onClick={() => {
                    close();
                    callback();
                  }}
                >
                  {label}
                </button>
              )
            )}
        </DialogActions>
      )}
    </Dialog>
  );
};

ModalContainer.propTypes = {
  modal: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        callback: PropTypes.func,
        label: PropTypes.string,
        buttonClassName: PropTypes.oneOf(['primary', 'secondary', 'warning'])
      })
    ),
    show: PropTypes.bool
  }),
  closeModal: PropTypes.func.isRequired
};

ModalContainer.defaultProps = {
  modal: {
    title: '',
    body: <p />,
    actions: []
  }
};

const mapStateToProps = ({ modal }) => ({
  modal
});

export default connect(
  mapStateToProps,
  mapActionsToProps('closeModal')
)(ModalContainer);
