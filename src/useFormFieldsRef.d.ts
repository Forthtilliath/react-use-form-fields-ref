export type HTMLFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export type HTMLRadioElement = Array<HTMLInputElement>;

export type Field = HTMLFieldElement | HTMLRadioElement;
