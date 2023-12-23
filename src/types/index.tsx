export interface IInitialValues {
  author: string;
  title: string;
  desc: string;
  releaseDate: Date | string;
  categories: number[];
  email: string;
  image: { name: string; url: string };
}

export interface ICategories {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

export interface IUserLogin {
  loggedIn: boolean;
  handleShowModal: () => void;
  handleLoggedChange: () => void;
}

export interface IBlog {
  author: string;
  categories: {
    background_color: string;
    id: number;
    text_color: string;
    title: string;
  }[];
  description: string;
  id: number;
  image: string;
  publish_date: string;
  title: string;
}
