import { css, FlattenSimpleInterpolation } from 'styled-components'

export default class Animation {
  constructor() {}
  normal = () => new NormalAnimation()
  absolute = () => new AbsoluteAnimation()
}

type AnimationProgress = {
  initialPosition?: string
  finalPosition?: string
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
  constructor() {}
  setProperties = (
    properties: {
      right?: AnimationProgress
      left?: AnimationProgress
      top?: AnimationProgress
      bottom?: AnimationProgress
    },
    duration?: string
  ): FinalAnimation => {
    this._right = properties.right ?? this._right
    this._left = properties.left ?? this._left
    this._top = properties.top ?? this._top
    this._bottom = properties.bottom ?? this._bottom
    return this.setAnimation(duration)
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
  setAnimation = (duration?: string): FinalAnimation => {
    return new FinalAnimation(
      css`
        position: absolute;
        ${this._right?.initialPosition &&
        `right: ${this._right?.initialPosition}`};
        ${this._left?.initialPosition &&
        `left: ${this._left?.initialPosition}`};
        ${this._top?.initialPosition && `top: ${this._top?.initialPosition}`};
        ${this._bottom?.initialPosition &&
        `bottom: ${this._bottom?.initialPosition}`};
      `,
      css`
        ${this._right?.finalPosition && `right: ${this._right?.finalPosition}`};
        ${this._left?.finalPosition && `left: ${this._left?.finalPosition}`};
        ${this._top?.finalPosition && `top: ${this._top?.finalPosition}`};
        ${this._bottom?.finalPosition &&
        `bottom: ${this._bottom?.finalPosition}`};
      `,
      duration
    )
  }
}

class NormalAnimation implements IAnimation {
  _margin?: AnimationProgress
  _padding?: AnimationProgress
  constructor() {}
  setProperties = (
    properties: {
      margin?: AnimationProgress
      padding?: AnimationProgress
    },
    duration?: string
  ) => {
    this._margin = properties.margin ?? this._margin
    this._padding = properties.padding ?? this._padding
    return this.setAnimation(duration)
  }
  margin = (value: AnimationProgress): NormalAnimation => {
    this._margin = value
    return this
  }
  padding = (value: AnimationProgress): NormalAnimation => {
    this._padding = value
    return this
  }
  setAnimation = (duration?: string): FinalAnimation => {
    return new FinalAnimation(
      css`
        ${this._margin?.initialPosition &&
        `margin: ${this._margin?.initialPosition}`};
        ${this._padding?.initialPosition &&
        `padding: ${this._padding?.initialPosition}`};
      `,
      css`
        ${this._margin?.finalPosition &&
        `margin: ${this._margin?.finalPosition}`};
        ${this._padding?.finalPosition &&
        `padding: ${this._padding?.finalPosition}`};
      `,
      duration
    )
  }
}

class FinalAnimation {
  readonly _initialPosition: FlattenSimpleInterpolation
  readonly _finalPosition: FlattenSimpleInterpolation
  readonly _duration: string
  constructor(
    initialPosition: FlattenSimpleInterpolation,
    finalPosition: FlattenSimpleInterpolation,
    duration: string = '500ms'
  ) {
    this._initialPosition = initialPosition
    this._finalPosition = finalPosition
    this._duration = duration
  }
  fadeIn = (): FlattenSimpleInterpolation => {
    return css`
      ${this._initialPosition}
      animation: fadeIn ${this._duration} ease-in forwards;
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        30% {
          opacity: 0;
        }
        100% {
          opacity: 1;
          ${this._finalPosition}
        }
      }
    `
  }
  fadeOut = (): FlattenSimpleInterpolation => {
    return css`
      ${this._initialPosition}
      animation: fadeOut ${this._duration} ease-out forwards;
      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        70% {
          opacity: 0;
        }
        100% {
          opacity: 0;
          ${this._finalPosition}
        }
      }
    `
  }
}
