export interface Messages {
  id: string;
  text: string;
}

export interface User {
  name: string;
  age: number;
}

export interface chatSection {
  user: User;
  onBack: () => void;
}

export interface loginValErr {
  name?: string;
  phone?: string;
}
