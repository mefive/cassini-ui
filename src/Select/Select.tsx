import * as React from 'react';
import classNames from 'classnames';
import debounce from 'lodash-es/debounce';
import { scrollTop } from 'dom-helpers/query';
import * as keyCode from 'keycode';
import { Animation } from '../Animate';
import SvgTimes from '../icons/solid/Times';
import Input from '../Input';
import Trigger from '../Trigger';
import Clickable from '../Clickable';
import Popover, { Placement } from '../Popover';
import safeSetState from '../safeSetState';
import CustomSelect from '../CustomSelect';

import {
  StyledPopover, StyledSelect,
} from './styled';

type Value = boolean | string | number;

export type Option = {
  value: Value,
  title: string,
};

type OptionMap = {
  [name: string]: Option,
};

export interface SelectProps {
  options?: Option[];
  value?: Value[] | Value;
  onChange?: (value: Value | Value[]) => void;
  defaultTitle?: string;
  popoverClassName?: string;
  renderOption?: Function;
  renderTitle?: Function;
  multiple?: boolean;
  disabled?: boolean;
  showSearch?: boolean;
  onSearch?: Function;
  width?: number;
  popover?: JSX.Element;
  className?: string;
}

@safeSetState
class Select extends React.PureComponent<SelectProps> {
  static defaultProps = {
    options: [],
    value: null,
    onChange: () => {},
    className: null,
    defaultTitle: '请选择',
    popoverClassName: null,
    renderOption: ({ title }) => title,
    renderTitle: ({ title }) => title,
    multiple: false,
    disabled: false,
    showSearch: false,
    onSearch: () => {},
    width: null,
    popover: (<StyledPopover />),
  };

  private popover: Popover = null;

  private anchor:CustomSelect = null;

  private optionsContainer: HTMLDivElement = null;

  private popoverScrollTop:number = 0;

  state = {
    active: false,
    width: null,
    optionCache: {} as OptionMap,
    keyword: null,
    keyboardNav: null,
  };

  syncWidth = debounce(() => {
    const { anchor } = this;

    if (anchor != null) {
      this.setState({ width: this.anchor.node.clientWidth });
    }
  });

  place = debounce(() => {
    if (this.popover) {
      this.popover.place();
    }
  });

  componentWillMount() {
    this.setOptionCache(this.props.options);
  }

  componentDidMount() {
    this.syncWidth();
    window.addEventListener('resize', this.syncWidth);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.setOptionCache(nextProps.options);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.syncWidth);
  }

  onSelect(option: Option) {
    if (this.props.multiple) {
      const value = (this.props.value as Value[]).slice();
      const index = value.indexOf(option.value);

      if (index === -1) {
        value.push(option.value);
      } else {
        value.splice(index, 1);
      }

      this.props.onChange(value);
      this.place();
    } else {
      this.props.onChange(option.value);
      this.setActive(false);
    }
  }

  onDocumentKeyDown = (e: KeyboardEvent) => {
    const code = keyCode(e);

    const { keyboardNav } = this.state;

    if (code === 'down' || code === 'up') {
      e.stopPropagation();
      e.preventDefault();

      const { options } = this.props;

      let index = keyboardNav ? options.findIndex(o => o.value === keyboardNav.value) : -1;

      if (code === 'down') {
        index = Math.min(options.length - 1, index + 1);
      } else if (code === 'up') {
        index = Math.max(0, index - 1);
      }

      this.setState({ keyboardNav: options[index] });
    }

    if (code === 'enter') {
      this.onSelect(keyboardNav);
    }

    if (code === 'esc') {
      this.setActive(false);
    }
  };

  setOptionCache(options: Option[] = []) {
    const { optionCache } = this.state;

    this.setState({
      optionCache: {
        ...optionCache,
        ...options.reduce((p, c) => ({
          ...p,
          [`${c.value}`]: c,
        }), {}),
      },
    });
  }

  setActive = (active: boolean) => {
    this.setState({ active }, () => {
      if (active) {
        scrollTop(this.optionsContainer, this.popoverScrollTop);
        document.addEventListener('keydown', this.onDocumentKeyDown);
      } else {
        document.removeEventListener('keydown', this.onDocumentKeyDown);
      }
    });

    if (!active) {
      this.popoverScrollTop = scrollTop(this.optionsContainer);
    }
  };

  renderTitle() {
    let title = null;
    const { value, renderTitle } = this.props;
    const { optionCache } = this.state;

    if (this.props.multiple) {
      const multipleValue = Array.isArray(value) ? value as Value[] : [value];

      title = (value && multipleValue.length > 0)
        ? (
          <div className="csui-select-choice-wrapper">
            {multipleValue.map(v => (
              <div className="csui-select-choice" key={`${v}`}>
                <div>{renderTitle(optionCache[`${v}`] || {})}</div>

                {!this.props.disabled && (
                  <Clickable
                    onClick={(e) => {
                      e.stopPropagation();
                      const newValue = [...multipleValue];
                      newValue.splice(multipleValue.indexOf(v), 1);

                      this.props.onChange(newValue);
                    }}
                  >
                    <SvgTimes style={{ width: 10 }} />
                  </Clickable>
                )}
              </div>
            ))}
          </div>
        )
        : null;
    } else {
      title = renderTitle(optionCache[`${value}`] || {});
    }

    return title || this.props.defaultTitle;
  }

  render() {
    const { value } = this.props;

    return (
      <Trigger
        active={this.state.active}
        onActiveChange={this.setActive}
        enterClassName={Animation.FADE_IN}
        leaveClassName={Animation.FADE_OUT}
        popover={() => (
          <Popover
            placement={Placement.BOTTOM}
            offset={5}
            hasArrow={false}
            className={classNames(
              'shadow',
              this.props.popoverClassName,
            )}
            ref={(popover) => { this.popover = popover; }}
          >
            {React.cloneElement(this.props.popover, null, (
              <React.Fragment>
                {this.props.showSearch && (
                  <div className="csui-select-keyword">
                    <Input
                      value={this.state.keyword}
                      onChange={(keyword) => {
                        this.setState({ keyword });
                        this.props.onSearch(keyword);
                      }}
                      placeholder="请输入关键字"
                    />
                  </div>
                )}

                <div
                  style={{
                    width: this.state.width,
                    overflow: 'auto',
                  }}
                  className="csui-select-options"
                  ref={(el) => { this.optionsContainer = el; }}
                >
                  {this.props.options.map(option => (
                    <Clickable
                      onClick={() => this.onSelect(option)}
                      key={`${option.value}`}
                    >
                      <div>
                        <div
                          className={classNames('csui-select-option', {
                            active: value === option.value
                              || (this.props.multiple
                                && value && (Array.isArray(value)
                                ? (value as Value[]).indexOf(option.value) !== -1
                                : value === option.value))
                              || (this.state.keyboardNav
                                && this.state.keyboardNav.value === option.value),
                          })}
                        >
                          {this.props.renderOption(option)}
                        </div>
                      </div>
                    </Clickable>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </Popover>
        )}
      >
        <StyledSelect
          className={this.props.className}
          active={this.state.active}
          ref={(el) => { this.anchor = el; }}
          style={{
            minWidth: this.props.width,
          }}
          disabled={this.props.disabled}
        >
          {this.renderTitle()}
        </StyledSelect>
      </Trigger>
    );
  }
}

export default Select;
