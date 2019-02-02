import * as React from 'react';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { scrollTop } from 'dom-helpers/query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as keyCode from 'keycode';
import { Animation } from '../Animate';

import Trigger from '../Trigger';
import Clickable from '../Clickable';
import Popover, { Placement } from '../Popover';
import Focusable from '../Focusable';
import safeSetState from '../safeSetState';
import Input from '../Input';
import CustomSelect from '../CustomSelect';

import {
  StyledPopover, StyledChoice, StyledChoiceContainer, StyledKeyword, StyledOption, StyledSelect,
} from './styled';

type Value = boolean | string | number;

export type Option = {
  value: Value,
  title: string,
};

type OptionMap = {
  [name: string]: Option,
};

interface Props {
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
  popoverHeight?: number;
}

@safeSetState
class Select extends React.PureComponent<Props & React.HTMLAttributes<any>> {
  static defaultProps = {
    options: [],
    value: null,
    onChange: () => {},
    className: null,
    defaultTitle: '请选择',
    popoverClassName: null,
    popoverHeight: 200,
    renderOption: ({ title }) => title,
    renderTitle: ({ title }) => title,
    multiple: false,
    disabled: false,
    showSearch: false,
    onSearch: () => {},
    width: null,
  };

  private popover: Popover = null;

  private anchor = React.createRef<CustomSelect>();

  private optionsContainer = React.createRef<HTMLDivElement>();

  private popoverScrollTop:number = 0;

  state = {
    active: false,
    width: null,
    optionCache: {} as OptionMap,
    keyword: null,
    keyboardNav: null,
  };

  syncWidth = debounce(() => {
    const anchor = this.anchor.current;

    if (anchor != null) {
      this.setState({ width: this.anchor.current.node.clientWidth });
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
      const value = this.props.value as Value[];
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
        scrollTop(this.optionsContainer.current, this.popoverScrollTop);
        document.addEventListener('keydown', this.onDocumentKeyDown);
      } else {
        document.removeEventListener('keydown', this.onDocumentKeyDown);
      }
    });

    if (!active) {
      this.popoverScrollTop = scrollTop(this.optionsContainer.current);
    }
  };

  renderTitle() {
    let title = null;
    const { value, renderTitle } = this.props;
    const { optionCache } = this.state;

    if (this.props.multiple) {
      const multipleValue = value as Value[];

      title = (value && multipleValue.length > 0)
        ? (
          <StyledChoiceContainer>
            {multipleValue.map(v => (
              <StyledChoice key={`${v}`}>
                <span>{renderTitle(optionCache[`${v}`] || {})}</span>

                {!this.props.disabled && (
                  <Clickable
                    onClick={(e) => {
                      e.stopPropagation();
                      const newValue = [...multipleValue];
                      newValue.splice(multipleValue.indexOf(v), 1);

                      this.props.onChange(newValue);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Clickable>
                )}
              </StyledChoice>
            ))}
          </StyledChoiceContainer>
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
            <StyledPopover>
              {this.props.showSearch && (
                <StyledKeyword>
                  <Input
                    value={this.state.keyword}
                    onChange={(keyword) => {
                      this.setState({ keyword });
                      this.props.onSearch(keyword);
                    }}
                    placeholder="请输入关键字"
                  />
                </StyledKeyword>
              )}

              <div
                style={{
                  width: this.state.width,
                  maxHeight: this.props.popoverHeight,
                  overflow: 'auto',
                }}
                ref={this.optionsContainer}
              >
                {this.props.options.map(option => (
                  <Clickable
                    onClick={() => this.onSelect(option)}
                    key={`${option.value}`}
                  >
                    <div>
                      <StyledOption
                        className={classNames(
                          {
                            active: value === option.value
                              || (this.props.multiple
                                && value && (value as Value[]).indexOf(option.value) !== -1)
                              || (this.state.keyboardNav
                                && this.state.keyboardNav.value === option.value),
                          },
                        )}
                      >
                        {this.props.renderOption(option)}
                      </StyledOption>
                    </div>
                  </Clickable>
                ))}
              </div>
            </StyledPopover>
          </Popover>
        )}
      >
        <div className={this.props.className}>
          <StyledSelect>
            <Focusable>
              <CustomSelect
                active={this.state.active}
                ref={this.anchor}
                style={{
                  minWidth: this.props.width,
                }}
                role="button"
              >
                {this.renderTitle()}
              </CustomSelect>
            </Focusable>
          </StyledSelect>
        </div>
      </Trigger>
    );
  }
}

export default Select;
