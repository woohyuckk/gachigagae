export const AUTH_VALID_LENGTH = {
  PASSWORD_MIN_LENGTH: 6,
  MIN_NICKNAME_LENGTH: 1,
  MAX_NICKNAME_LENGTH: 8,
};

export const AUTH_ERROR_MESSAGES = {
  /* 회원가입 */
  EMAIL_NO_SPACES: 'ID에는 공백을 포함할 수 없습니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_NO_SPACES: '비밀번호에는 공백을 포함할 수 없습니다.',
  PASSWORD_TOO_SHORT: '비밀번호는 최소 6자 이상이어야 합니다.',
  NICKNAME_NO_SPACES: '닉네임에는 공백을 포함할 수 없습니다.',
  NICKNAME_LENGTH: (min, max) => `닉네임은 ${min}자 이상 ${max}자 이하여야 합니다.`,
  SIGNUP_FAILED: '오류가 발생했습니다. 다시 시도해 주세요.',

  /* 로그인 */
  INVALID_CREDENTIALS: '이메일과 비밀번호를 올바르게 입력해주세요.',
  LOGIN_FAILED: '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.',
  LOGIN_ERROR: '로그인 중 오류가 발생했습니다.',
  WRONG_EMAIL_OR_PASSWORD: '사용자 아이디 또는 비밀번호가 올바르지 않습니다.',
};
