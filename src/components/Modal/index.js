import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Modals = styled.div`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 98vw;
  height: 96vh;
  background-color: transparent;
  display: grid;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  width: 311px;
  border-radius: 12.8px;
  filter: drop-shadow(0 8px 16px rgba(51, 51, 51, 0.12));
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 32px;
  box-sizing: border-box;
  grid-gap: 12px;
`

const Modal = ({ children, show, ...props }) => {
  return (
    <Modals {...props} show={show}>
      <ModalContainer>{children}</ModalContainer>
    </Modals>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Modal
