import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import useClickAway from '../../hooks/useClickAway'

const ModalDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 100;
  display: grid;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 32px;
  box-sizing: border-box;
  border-radius: 12.8px;
  filter: drop-shadow(0 8px 16px rgba(51, 51, 51, 0.12));
  display: grid;
  align-items: center;
  justify-content: center;
  grid-gap: 12px;
`

const Modal = ({
  children,
  width = '18rem',
  height,
  show = true,
  onClose,
  ...props
}) => {
  const ref = useClickAway(() => {
    onClose && onClose()
  })

  const containerStyle = useMemo(() => ({ width, height }), [width, height])

  const el = useMemo(() => document.createElement('div'), [])
  useEffect(() => {
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  })

  return ReactDOM.createPortal(
    <ModalDim style={{ display: show ? 'block' : 'none' }}>
      <ModalContainer
        ref={ref}
        {...props}
        style={{ ...props.style, ...containerStyle }}
      >
        {children}
      </ModalContainer>
    </ModalDim>,
    el
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Modal
