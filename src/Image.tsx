import * as React from 'react';
import omit from 'lodash-es/omit';
import { keys } from 'ts-transformer-keys';
import Central from './Central';

const dimensionCache: {
  [s: string]: {
    width: number,
    height: number,
  }
} = {};

export enum ImageMode {
  MODE_STRETCH = 'stretch',
  MODE_AUTO = 'auto',
  MODE_OUTER_CUT = 'outer_cut',
  MODE_INNER_CUT = 'inner_cut'
}

interface Props {
  className?: string;
  mode?: ImageMode;
  backgroundColor?: string;
  defaultUrl?: string;
  width?: number | string;
  height?: number | string;
  loading?: JSX.Element | string;
}

export type ImageProps = Props & React.ImgHTMLAttributes<any>;

class Image extends React.PureComponent<ImageProps> {
  static defaultProps = {
    alt: 'image',
    mode: ImageMode.MODE_AUTO,
    backgroundColor: 'transparent',
    loading: '...',
  };

  private container: HTMLDivElement = null;

  private fakeImage: HTMLImageElement = null;

  state = {
    width: null as number,
    height: null as number,
    marginLeft: null as number,
    marginTop: null as number,
    hasLoaded: false,
  };

  componentDidMount() {
    if (this.props.mode === ImageMode.MODE_AUTO) {
      return;
    }

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    if (this.props.mode === ImageMode.MODE_STRETCH) {
      // eslint-disable-next-line
      this.setState({ width, height });
    }

    if (this.props.src in dimensionCache) {
      this.onLoad();
    }
  }

  componentDidUpdate({ width, height, src }) {
    if ((width !== this.props.width || height !== this.props.height) && src in dimensionCache) {
      this.onLoad();
    }
  }

  onLoad = () => {
    const { clientWidth: containerWidth, clientHeight: containerHeight } = this.container;

    let imageWidth;
    let imageHeight;

    if (this.props.src in dimensionCache) {
      const dimension = dimensionCache[this.props.src];

      imageWidth = dimension.width;
      imageHeight = dimension.height;
    } else {
      imageWidth = this.fakeImage.clientWidth;
      imageHeight = this.fakeImage.clientHeight;

      dimensionCache[this.props.src] = {
        width: imageWidth,
        height: imageHeight,
      };
    }

    const containerAspectRatio = containerWidth / containerHeight;
    const imageAspectRatio = imageWidth / imageHeight;

    let width;
    let height;
    let marginLeft;
    let marginTop;

    if (this.props.mode === ImageMode.MODE_OUTER_CUT) {
      if (containerAspectRatio >= imageAspectRatio) {
        width = containerWidth;
        height = width / imageAspectRatio;
        marginTop = -0.5 * (height - containerHeight);
      } else {
        height = containerHeight;
        width = height * imageAspectRatio;
        marginLeft = -0.5 * (width - containerWidth);
      }
    } else if (this.props.mode === ImageMode.MODE_INNER_CUT) {
      if (containerAspectRatio >= imageAspectRatio) {
        height = containerHeight;
        width = height * imageAspectRatio;
        marginLeft = 0.5 * (containerWidth - width);
      } else {
        width = containerWidth;
        height = width / imageAspectRatio;
        marginTop = 0.5 * (containerHeight - height);
      }
    }

    this.setState({
      hasLoaded: true,
      height,
      width,
      marginTop,
      marginLeft,
    });
  };

  render() {
    const props = omit(this.props, keys<Props>());
    const { hasLoaded } = this.state;
    const { mode } = this.props;

    if (mode === ImageMode.MODE_AUTO) {
      return (
        <img
          className={this.props.className}
          src={this.props.src}
          alt={this.props.alt}
          style={{ width: this.props.width, height: 'auto' }}
        />
      );
    }

    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height,
          overflow: 'hidden',
          backgroundColor: this.props.backgroundColor,
          position: 'relative',
          display: 'inline-block',
        }}
        ref={(el) => { this.container = el; }}
        className={this.props.className}
      >
        {(!hasLoaded && mode !== ImageMode.MODE_STRETCH) && (
          <React.Fragment>
            {this.props.defaultUrl != null
              ? (
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={this.props.defaultUrl}
                  alt="default"
                />
              )
              : (
                <Central
                  className="bg-white"
                >
                  {this.props.loading}
                </Central>
              )}
          </React.Fragment>
        )}

        {(hasLoaded || mode === ImageMode.MODE_STRETCH) && (
          <img
            {...props}
            src={this.props.src}
            alt={this.props.alt}
            style={{
              ...(this.props.style || {}),
              width: this.state.width,
              height: this.state.height,
              marginLeft: this.state.marginLeft,
              marginTop: this.state.marginTop,
            }}
          />
        )}

        {mode !== ImageMode.MODE_STRETCH && !hasLoaded && (
          <img
            {...props}
            style={{ opacity: 0, position: 'fixed', zIndex: -1 }}
            src={this.props.src}
            alt={this.props.alt}
            ref={(el) => { this.fakeImage = el; }}
            onLoad={this.onLoad}
          />
        )}
      </div>
    );
  }
}

export default Image;
