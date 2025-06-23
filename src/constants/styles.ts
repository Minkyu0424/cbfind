export const INPUT_STYLE = {
  login: (className: string) =>
    `w-full h-[50px] border border-[var(--gray)] rounded-lg px-4 focus:outline-none rounded-lg ${className}`,
  upload: (className: string) =>
    `w-full text-sm h-10 border border-[var(--gray)] rounded-lg px-4 focus:outline-none rounded-lg ${className}`,
  search: (className: string) =>
    `w-full text-sm h-12 border border-[var(--gray)] rounded-lg px-3 focus:outline-none rounded-lg ${className}`,
} as const;

export const BUTTON_STYLE = {
  login: (className: string) =>
    `w-full h-12 flex items-center justify-center bg-[var(--main2)] text-[var(--white)] rounded-lg shadow-lg cursor-pointer ${className}`,
} as const;
