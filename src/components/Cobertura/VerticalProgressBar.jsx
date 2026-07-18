import React from 'react'
import { withStyles } from 'tss-react/mui';

const styles = () => ({
  emptySpace: {
    background: '#eae1ea'// theme.palette.background.opaque
  }
});
// Progress bar settings
const width = 50
const height = 200

const VerticalProgressBar = props => {
  // value must be between 0 and 100
  const { value, color, classes } = props
  const canvasRef = React.useRef(null)
  React.useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')

    const fill_height = (height / 100) * value
    const y_value = height - fill_height

    // Progress
    ctx.fillStyle = color
    ctx.fillRect(0, y_value, width, fill_height)

    /* Empty section
        ctx.fillStyle = '#fff000';
        ctx.fillRect(0, 0, width, 170);
        */
  }, [])

  React.useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')

    const fill_height = (height / 100) * value
    const y_value = height - fill_height

    // borrar el color anterior
    ctx.fillStyle = '#eae1ea'
    ctx.fillRect(0, 0, width, height)

    // Progress
    ctx.fillStyle = color

    ctx.fillRect(0, y_value, width, fill_height)
  }, [value])

  return (
    <canvas
      ref={canvasRef} width={width} height={height} style={{
        border: '2px',
        borderStyle: 'solid',
        color: '#d3d3d3',
        borderRadius: '30px 30px 0px 0'
      }}
      className={classes.emptySpace}
    />
  )
}

export default withStyles(VerticalProgressBar, styles);
