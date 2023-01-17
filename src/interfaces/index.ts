import { education } from '../components/detail-page/cv/cv-data';

export interface StartDate {
  month: number;
  year: number;
}

export interface Company {
  name: string;
}

export interface IExperiences {
  isCurrent: boolean;
  summary: string;
  title: string;
  startDate: StartDate;
  company: Company;
  endDate: EndDate;
}

export interface StartDate {
  year: number;
}

export interface EndDate {
  year: number;
}

export interface IEducation {
  degree: string;
  fieldOfStudy: string;
  notes: string;
  schoolName: string;
  startDate: StartDate;
  endDate: EndDate;
}

export interface ISkills {
  name: string;
}

export interface IAchievements {
  issuer: string;
  name: string;
}

export interface IOption {
  label: string;
  value: string;
}

export interface IDropdownOptions {
  options: IOption[];
}

export interface Weight {
  imperial: string;
  metric: string;
}

export interface Height {
  imperial: string;
  metric: string;
}

export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface IBreed {
  weight: Weight;
  height: Height;
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
  image: Image;
  country_code: string;
  description: string;
  history: string;
}
