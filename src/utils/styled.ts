export function ellipsis(width?: number | string): string {
  return `
maxWidth: ${width == null ? '100%' : width},
overflow: 'hidden',
textOverflow: 'ellipsis',
whiteSpace: 'nowrap',
wordWrap: 'normal',
  `;
}

export default ellipsis;
