import * as React from 'react';
import { omit } from 'lodash';
import { keys } from 'ts-transformer-keys';

export enum ImageMode {
  MODE_STRETCH = 'stretch',
  MODE_AUTO = 'auto',
  MODE_OUTER_CUT = 'outer_cut',
  MODE_INNER_CUT = 'inner_cut'
}

type ImageProps = {
  mode: ImageMode;
  backgroundColor?: string;
};

class Image extends React.PureComponent<ImageProps & React.ImgHTMLAttributes<any>> {
  static defaultProps = {
    src: null,
    alt: 'image',
    width: null,
    height: null,
    mode: 'auto',
    className: null,
    backgroundColor: '#fff',
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
  }

  onLoad = () => {
    const { clientWidth: containerWidth, clientHeight: containerHeight } = this.container;
    const { clientWidth: imageWidth, clientHeight: imageHeight } = this.fakeImage;

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
    const imagePropsKeys = keys<ImageProps>();
    const props = omit(this.props, imagePropsKeys);

    if (this.props.mode === ImageMode.MODE_AUTO) {
      return (
        <img
          {...props}
          alt={this.props.alt}
          style={{ width: this.props.width, height: 'auto' }}
        />
      );
    }

    return (
      <div
        {...props}
        style={{
          width: this.props.width,
          height: this.props.height,
          overflow: 'hidden',
          backgroundColor: this.props.backgroundColor,
        }}
        ref={(el) => { this.container = el; }}
      >
        <img
          {...props}
          alt={this.props.alt}
          style={{
            width: this.state.width,
            height: this.state.height,
            marginLeft: this.state.marginLeft,
            marginTop: this.state.marginTop,
          }}
        />

        {this.props.mode !== ImageMode.MODE_STRETCH && !this.state.hasLoaded && (
          <img
            style={{ opacity: 0, position: 'fixed' }}
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
