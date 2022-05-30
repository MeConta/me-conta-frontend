import { css, FlattenSimpleInterpolation, keyframes } from 'styled-components'

export default abstract class Animation {
  static normal = () => NormalAnimation.instance
  static absolute = () => AbsoluteAnimation.instance
}

type AnimationProgress = {
  initialPosition?: string
  finalPosition?: string
}

type AnimationProperties = {
  delay?: string
  timingFunction?: string
}

interface IAnimation {
  // eslint-disable-next-line no-unused-vars
  setProperties: (properties: {}, duration?: string) => FinalAnimation
  setAnimation: () => FinalAnimation
}

class AbsoluteAnimation implements IAnimation {
  _right?: AnimationProgress
  _left?: AnimationProgress
  _top?: AnimationProgress
  _bottom?: AnimationProgress
  static _instance: AbsoluteAnimation
  constructor() {}
  static get instance(): AbsoluteAnimation {
    if (!AbsoluteAnimation._instance) {
      AbsoluteAnimation._instance = new AbsoluteAnimation()
    }
    return AbsoluteAnimation._instance
  }
  setProperties = (
    properties: {
      right?: AnimationProgress
      left?: AnimationProgress
      top?: AnimationProgress
      bottom?: AnimationProgress
      animation?: AnimationProperties
      isRelative?: boolean
    },
    duration?: string
  ): FinalAnimation => {
    this._right = properties.right
    this._left = properties.left
    this._top = properties.top
    this._bottom = properties.bottom
    return this.setAnimation(
      duration,
      properties.animation,
      properties.isRelative
    )
  }
  right = (value: AnimationProgress): AbsoluteAnimation => {
    this._right = value
    return this
  }
  left = (value: AnimationProgress): AbsoluteAnimation => {
    this._left = value
    return this
  }
  top = (value: AnimationProgress): AbsoluteAnimation => {
    this._top = value
    return this
  }
  bottom = (value: AnimationProgress): AbsoluteAnimation => {
    this._bottom = value
    return this
  }
  setAnimation = (
    duration?: string,
    animation?: AnimationProperties,
    isRelative?: boolean
  ): FinalAnimation => {
    return new FinalAnimation(
      css`
        ${this._right?.initialPosition && {
          right: this._right?.initialPosition
        }};
        ${this._left?.initialPosition && {
          left: this._left?.initialPosition
        }};
        ${this._top?.initialPosition && {
          top: this._top?.initialPosition
        }};
        ${this._bottom?.initialPosition && {
          bottom: this._bottom?.initialPosition
        }};
      `,
      css`
        ${this._right?.finalPosition && {
          right: this._right?.finalPosition
        }};
        ${this._left?.finalPosition && {
          left: this._left?.finalPosition
        }};
        ${this._top?.finalPosition && {
          top: this._top?.finalPosition
        }};
        ${this._bottom?.finalPosition && {
          bottom: this._bottom?.finalPosition
        }};
      `,
      duration,
      animation,
      isRelative ? 'relative' : 'absolute'
    )
  }
}

class NormalAnimation implements IAnimation {
  _margin?: AnimationProgress
  _padding?: AnimationProgress
  static _instance: NormalAnimation
  constructor() {}
  static get instance(): NormalAnimation {
    if (!NormalAnimation._instance) {
      NormalAnimation._instance = new NormalAnimation()
    }
    return NormalAnimation._instance
  }
  setProperties = (
    properties: {
      margin?: AnimationProgress
      padding?: AnimationProgress
      animation?: AnimationProperties
    },
    duration?: string
  ) => {
    this._margin = properties.margin
    this._padding = properties.padding
    return this.setAnimation(duration, properties.animation)
  }
  margin = (value: AnimationProgress): NormalAnimation => {
    this._margin = value
    return this
  }
  padding = (value: AnimationProgress): NormalAnimation => {
    this._padding = value
    return this
  }
  setAnimation = (
    duration?: string,
    animation?: AnimationProperties
  ): FinalAnimation => {
    return new FinalAnimation(
      css`
        ${this._margin?.initialPosition && {
          margin: this._margin?.initialPosition
        }};
        ${this._padding?.initialPosition && {
          padding: this._padding?.initialPosition
        }};
      `,
      css`
        ${this._margin?.finalPosition && {
          margin: this._margin?.finalPosition
        }};
        ${this._padding?.finalPosition && {
          padding: this._padding?.finalPosition
        }};
      `,
      duration,
      animation
    )
  }
}

const fade = (
  opacity: {
    initial: number
    final: number
  },
  position: {
    initialPosition: FlattenSimpleInterpolation
    finalPosition: FlattenSimpleInterpolation
  }
) => keyframes`
  0% {
    opacity: ${opacity.initial};
    ${position.initialPosition};
  }
  30% {
    opacity: ${opacity.initial};
  }
  100% {
    opacity: ${opacity.final};
    ${position.finalPosition};
  }
`

class FinalAnimation {
  readonly _initialPosition: FlattenSimpleInterpolation
  readonly _finalPosition: FlattenSimpleInterpolation
  readonly _duration: string
  readonly _animation?: AnimationProperties
  readonly _position?: string
  constructor(
    initialPosition: FlattenSimpleInterpolation,
    finalPosition: FlattenSimpleInterpolation,
    duration: string = '500ms',
    animation?: AnimationProperties,
    position?: string
  ) {
    this._initialPosition = initialPosition
    this._finalPosition = finalPosition
    this._duration = duration
    this._animation = animation
    this._position = position
  }

  get finalPosition(): FlattenSimpleInterpolation {
    return this._finalPosition
  }

  get initialPosition(): FlattenSimpleInterpolation {
    return this._initialPosition
  }

  fadeIn = (): FlattenSimpleInterpolation => {
    return css`
      ${this._position && `position: ${this._position}`};
      ${this.initialPosition};
      animation-name: ${fade(
        { initial: 0, final: 1 },
        {
          initialPosition: this.initialPosition,
          finalPosition: this.finalPosition
        }
      )};
      animation-duration: ${this._duration};
      animation-fill-mode: forwards;
      animation-timing-function: ${this._animation?.timingFunction ??
      'ease-in'};
      ${this._animation?.delay && { animationDelay: this._animation?.delay }};
    `
  }
  fadeOut = (): FlattenSimpleInterpolation => {
    return css`
      ${this._position && `position: ${this._position}`};
      ${this.initialPosition};
      animation-name: ${fade(
        { initial: 1, final: 0 },
        {
          initialPosition: this.initialPosition,
          finalPosition: this.finalPosition
        }
      )};
      animation-duration: ${this._duration};
      animation-fill-mode: forwards;
      animation-timing-function: ${this._animation?.timingFunction ??
      'ease-out'};
      ${this._animation?.delay && { animationDelay: this._animation?.delay }};
    `
  }
}
