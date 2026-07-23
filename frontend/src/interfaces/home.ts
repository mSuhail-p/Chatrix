export interface Messages {
  id: string;
  text: string;
}

export interface User {
  name: string;
  age: number;
}

export interface chatSectionProp {
  user: { name: string; age: number };
  onBack: () => void;
}

export interface loginValErr {
  name?: string;
  phone?: string;
}
