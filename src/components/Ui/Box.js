// @flow
import classnames from 'classnames'
import { isUndefined, omitBy } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import Styles from './Box.module.css'
import { BgColors } from './colors'
import Layout from './Layout.module.css'

type Display = 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden'
type Direction = 'row' | 'column'
type Justify = 'center' | 'start' | 'end' | 'space-around' | 'space-between'
type Color = 'jet' | 'flame' | 'vividGambodge' | 'spanishBlue' | 'black' | 'white' | 'transparent'
type Align = 'center' | 'flex-start' | 'flex-end'

type Props = {
  display?: Display,
  direction?: Direction,
  justify?: Justify,
  color?: Color,
  height?: Number | String,
  width?: Number | String,
  padding?: Number,
  margin?: Number,
  align?: Align,
  paddingLeft?: String | Number,
  paddingRight?: String | Number,
  marginTop?: String | Number,
  marginRight?: String | Number,
  marginBottom?: String | Number,
  marginLeft?: String | Number,
  shape?: 'square' | 'circle',
  maxWidth?: String | Number,
  maxHeight?: String | Number,
  bordered?: Boolean,
  scroll?: Boolean,
  position?: 'absolute' | 'fixed' | 'inherit' | 'initial' | 'relative',
  zIndex?: String | Number,
}

const displayCs = {
  block: Layout.block,
  inline: Layout.flex,
  inlineBlock: Layout.inlineBlock,
  table: Layout.table,
  flex: Layout.flex,
}

const directionCs = {
  column: Styles.directionColumn,
  row: Styles.directionRow,
  initial: Styles.directionInitial,
}

const justifyContentCs = {
  center: Layout.justifyCenter,
  end: Layout.justifyEnd,
  start: Layout.justifyStart,
  spaceAround: Layout.justifySpaceAround,
  spaceBetween: Layout.justifySpaceBetween,
  initial: Layout.justifyInitial,
}

const alignCs = {
  center: Layout.alignMiddle,
  end: Layout.alignEnd,
  start: Layout.alignStart,
}

const shapesCs = {
  circle: Styles.circle,
  square: Styles.square,
}

const positionCs = {
  absolute: Layout.absolute,
  relative: Layout.relative,
  initial: Layout.initial,
  inherit: Layout.inherit,
  fixed: Layout.fixed,
}

function getDirection(display, direction) {
  switch (display) {
    case 'flex':
      return directionCs[direction]
    default:
      return ''
  }
}

function getJustify(display, justify) {
  switch (display) {
    case 'flex':
      return justifyContentCs[justify]
    default:
      return ''
  }
}

function combineStyles(inlineStyles) {
  const filteredStyles = omitBy(inlineStyles, item => isUndefined(item))

  return Object.freeze(filteredStyles)
}

const Box = ({ children, ...props }): Props => {
  const {
    align,
    display,
    direction,
    justify,
    bordered,
    color,
    height,
    padding,
    paddingLeft,
    paddingRight,
    flex,
    margin,
    maxHeight,
    maxWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    position,
    scroll,
    shape,
    zIndex,
    width,
  } = props

  const classNames = classnames(
      displayCs[display],
      getDirection(display, direction),
      getJustify(display, justify),
      BgColors[color],
      alignCs[align],
      shapesCs[shape],
      bordered ? Styles.bordered : '',
      scroll ? Styles.scroll : '',
      positionCs[position],
  )

  const inlineStyles = combineStyles({
    padding,
    paddingLeft,
    paddingRight,
    margin,
    flex,
    maxWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    height,
    width,
    maxHeight,
    zIndex,
  })

  return (
      <div
          className={classNames}
          style={inlineStyles}
      >
        {children}
      </div>
  )
}

Box.propTypes = {
  display: PropTypes.oneOf(['block', 'inline', 'inlineBlock', 'table', 'flex']),
  direction: PropTypes.oneOf(['row', 'column', 'initial']),
  justify: PropTypes.oneOf(['center', 'start', 'end', 'space-around', 'space-between', 'initial']),
  align: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'initial']),
  color: PropTypes.oneOf(['jet', 'flame', 'vividGambodge', 'spanishBlue', 'black', 'white', 'transparent']),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.number,
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shape: PropTypes.oneOf(['square', 'circle']),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bordered: PropTypes.bool,
  scroll: PropTypes.bool,
  position: PropTypes.oneOf(['absolute', 'fixed', 'inherit', 'initial', 'relative']),
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Box.defaultProps = {
  align: 'initial',
  display: 'block',
  direction: 'initial',
  justify: 'initial',
  color: 'transparent',
  height: 'auto',
  shape: 'square',
  width: 'auto',
  padding: 0,
  margin: 0,
  bordered: false,
  scroll: false,
  position: 'inherit',
  zIndex: 'auto',
}

export default Box
