import { BreadcrumbItem } from "./breadcrumbItem.model";

export interface RouteModel {
  lang: 'hu' | 'en';


  path: string;        
  slug: string;        


  contentType: 'article' | 'ride' | 'playlist' | 'page';
  contentId: string; 


  title: string;
  description: string;
  ogImage?: string;


  breadcrumb?: BreadcrumbItem[];
}