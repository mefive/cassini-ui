import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

export interface FileUploadResult {
  url?: string;
  filename?: string;
}

interface Props {
  value?: string;
  trigger?: JSX.Element;
  onUpload?: (files: FileList) => Promise<FileUploadResult | void>;
  onChange?: (value: string, e: React.ChangeEvent) => void;
}

type I = React.InputHTMLAttributes<any>;

export type FileInputProps = Props & Pick<I, Exclude<keyof I, 'onChange'>>;

const StyledFileInput = styled.div`
  &.has-trigger {
    position: relative;
    display: inline-block;
    overflow: hidden;
    
    [type="file"] {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
      cursor: pointer;
    }
  } 
`;

class FileInput extends React.PureComponent<FileInputProps> {
  private onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const { onUpload } = this.props;

    if (onUpload) {
      const rs = await onUpload(files);

      if (rs) {
        this.props.onChange(rs.url, e);
      }
    }
  };

  render() {
    const {
      className, trigger, value, onUpload, onChange, ...props
    } = this.props;

    return (
      <StyledFileInput
        className={classNames(className, { 'has-trigger': trigger != null })}
      >
        {trigger}

        <input
          {...props}
          type="file"
          onChange={this.onChange}
        />
      </StyledFileInput>
    );
  }
}

export default FileInput;
