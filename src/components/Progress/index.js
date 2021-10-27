import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Text from '../Text'
import theme from '../../themes'

const sizeStyles = {
  medium: {
    padding: '0.625rem 0',
    fontSize: theme.fontSizes.sm,
  },
  large: {
    padding: '0.875rem 0',
    fontSize: theme.fontSizes.h6,
  },
}

const StyledProgress = styled.div`
  padding: ${(props) => sizeStyles[props.size].padding};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  font-weight: 500;
  background-color: ${theme.colors.gray_2};
  position: relative;
  height: 1rem;
  overflow: hidden;
  min-width: 7.5rem;
  width: ${(props) => props.width};
`
const ProgressBar = styled.div`
  background-color: ${theme.colors.primary};
  height: 200%;
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
`

const Progress = ({
  size,
  width = '100%',
  targetNum,
  resultNum,
  children,
  ...props
}) => {
  return (
    <StyledProgress {...props} size={size}>
      {targetNum && resultNum && (
        <ProgressBar
          style={{ width: `${(resultNum / targetNum) * 100}%` }}
        ></ProgressBar>
      )}
      <Text style={{ zIndex: 10 }} size={sizeStyles[size].fontSize}>
        {children}
      </Text>
    </StyledProgress>
  )
}

Progress.propTypes = {
  size: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  targetNum: PropTypes.number,
  resultNum: PropTypes.number,
  children: PropTypes.node.isRequired,
}

export default Progress
