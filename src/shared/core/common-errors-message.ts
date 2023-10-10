export const IS_REQUIRED = JSON.stringify({ key: 'TR.DTO_ERROR.IS_REQUIRED' });
export const IS_STRING = JSON.stringify({ key: 'TR.DTO_ERROR.IS_STRING' });
export const MIN_LENGTH = (count: number) => {
  return JSON.stringify({ key: 'TR.DTO_ERROR.MIN_LENGTH', args: { count } });
};
export const MAX_LENGTH = (count: number) => {
  return JSON.stringify({ key: 'TR.DTO_ERROR.MIN_LENGTH', args: { count } });
};
export const IS_EMAIL = JSON.stringify({ key: 'TR.DTO_ERROR.IS_EMAIL' });
export const IS_UUID = JSON.stringify({ key: 'TR.DTO_ERROR.IS_UUID' });

export const FORBIDDEN_FOR_ROLE = JSON.stringify({
  key: 'TR.FORBIDDEN_FOR_ROLE',
});
