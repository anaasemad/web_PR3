export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  fullDescription: string;
  image: string;
  images: string[];
  tags: string[];
  features: string[];
  results: string[];
}

export interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  date: string;
}
