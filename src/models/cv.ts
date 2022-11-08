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
